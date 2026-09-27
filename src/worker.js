export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    try {
      // =========================================================
      // WEBSITE
      // =========================================================
      if (
        request.method === "GET" &&
        (url.pathname === "/" || url.pathname === "/index.html")
      ) {
        return env.ASSETS.fetch(
          "https://assets.local/index.html"
        );
      }

      // =========================================================
      // HEALTH CHECK
      // =========================================================
      if (url.pathname === "/api/health") {
        return json(
          {
            ok: true,
            service: "Telecom Project Tracker",
            database: "D1"
          },
          cors
        );
      }

      // =========================================================
      // GET PROJECTS
      // =========================================================
      if (
        url.pathname === "/api/projects" &&
        request.method === "GET"
      ) {
        const search =
          (url.searchParams.get("search") || "").trim();

        const region =
          (url.searchParams.get("region") || "").trim();

        const sow =
          (url.searchParams.get("sow") || "").trim();

        const po =
          (url.searchParams.get("po") || "").trim();

        const attention =
          (url.searchParams.get("attention") || "").trim();

        let sql = `
          SELECT *
          FROM project_tracker
          WHERE 1=1
        `;

        const args = [];

        if (search) {
          sql += `
            AND (
              customer LIKE ?
              OR project LIKE ?
              OR site_id LIKE ?
              OR new_xl_id LIKE ?
              OR province LIKE ?
            )
          `;

          const q = `%${search}%`;

          args.push(q, q, q, q, q);
        }

        if (region) {
          sql += ` AND region = ?`;
          args.push(region);
        }

        if (sow) {
          sql += ` AND sow = ?`;
          args.push(sow);
        }

        if (po) {
          sql += ` AND po_status = ?`;
          args.push(po);
        }

        if (attention) {
          sql += ` AND attention_level = ?`;
          args.push(attention);
        }

        sql += ` ORDER BY id`;

        const result = await env.DB
          .prepare(sql)
          .bind(...args)
          .all();

        return json(
          {
            rows: result.results || []
          },
          cors
        );
      }

      // =========================================================
      // UPDATE PROJECT
      // =========================================================
      const match = url.pathname.match(
        /^\/api\/projects\/(\d+)$/
      );

      if (
        match &&
        request.method === "PATCH"
      ) {
        const id = Number(match[1]);

        const body = await request.json();

        const editable = [
          "customer",
          "project",
          "region",
          "province",
          "site_id",
          "new_xl_id",
          "sow",
          "scope",
          "po_status",
          "ti_status",
          "payment_status",
          "wcc_status",
          "last_update",
          "action_due_date",
          "action_status"
        ];

        const sets = [];
        const args = [];

        for (const key of editable) {
          if (
            Object.prototype.hasOwnProperty.call(
              body,
              key
            )
          ) {
            sets.push(`${key} = ?`);
            args.push(body[key] ?? "");
          }
        }

        if (!sets.length) {
          return json(
            {
              error:
                "No editable fields supplied"
            },
            cors,
            400
          );
        }

        const current = await env.DB
          .prepare(`
            SELECT
              po_status,
              ti_status
            FROM project_tracker
            WHERE id = ?
          `)
          .bind(id)
          .first();

        const poStatus =
          body.po_status ??
          current?.po_status ??
          "";

        const tiStatus =
          body.ti_status ??
          current?.ti_status ??
          "";

        // =====================================================
        // ATTENTION LOGIC
        // =====================================================

        let level = "NORMAL";
        let reason = "";
        let action = "";
        let owner = "";

        const ti =
          (tiStatus || "").toUpperCase();

        const po =
          (poStatus || "").toUpperCase();

        if (
          ti.includes("BLOCK ACCESS")
        ) {
          level = "CRITICAL";
          reason = "Block Access";
          action =
            "Resolve site access issue";
          owner =
            "Site Coordinator";

        } else if (
          ti.includes("NOTSTART") ||
          ti.includes("NOT START")
        ) {
          level = "HIGH";
          reason = "Not Started";
          action =
            "Confirm site readiness and mobilization";
          owner =
            "Project Coordinator";

        } else if (
          po === "PO OUTSTANDING"
        ) {
          level = "HIGH";
          reason = "PO Outstanding";
          action =
            "Follow up PO release and confirm expected date";
          owner =
            "Commercial / Procurement";

        } else if (
          po === "PO OPEN"
        ) {
          level = "MEDIUM";
          reason = "PO Open";
          action =
            "Review PO status and confirm next action";
          owner =
            "Commercial / Procurement";
        }

        sets.push(
          `attention_level = ?`,
          `attention_reason = ?`,
          `action_required = ?`,
          `action_owner = ?`,
          `follow_up_flag = ?`,
          `report_flag = ?`
        );

        args.push(
          level,
          reason,
          action,
          owner,
          level === "NORMAL"
            ? ""
            : "YES",
          level === "NORMAL"
            ? ""
            : "YES"
        );

        args.push(id);

        await env.DB
          .prepare(`
            UPDATE project_tracker
            SET ${sets.join(", ")}
            WHERE id = ?
          `)
          .bind(...args)
          .run();

        const updated =
          await env.DB
            .prepare(`
              SELECT *
              FROM project_tracker
              WHERE id = ?
            `)
            .bind(id)
            .first();

        return json(
          {
            row: updated
          },
          cors
        );
      }

      // =========================================================
      // OTHER STATIC FILES
      // =========================================================

      return env.ASSETS.fetch(
        `https://assets.local${url.pathname}${url.search}`
      );

    } catch (e) {
      return json(
        {
          error:
            e?.message ||
            String(e)
        },
        cors,
        500
      );
    }
  }
};

function json(
  data,
  headers = {},
  status = 200
) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        ...headers
      }
    }
  );
}