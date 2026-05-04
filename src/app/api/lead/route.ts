import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  projectTypeOther?: string;
  budget?: string;
  description?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(lead: Required<Pick<LeadPayload, "name" | "email" | "description">> & LeadPayload) {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Project Type", lead.projectType === "Other" ? lead.projectTypeOther : lead.projectType],
    ["Budget", lead.budget],
  ];
  const tableRows = rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#888;font:500 12px/1.4 system-ui">${escapeHtml(
          k
        )}</td><td style="padding:6px 12px;font:500 14px/1.4 system-ui">${escapeHtml(
          String(v)
        )}</td></tr>`
    )
    .join("");
  return `
    <div style="font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0a0a0f">
      <h2 style="margin:0 0 16px;font:700 18px system-ui">New BuildXWorks lead</h2>
      <table style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden">${tableRows}</table>
      <h3 style="margin:24px 0 8px;font:600 14px system-ui;color:#555">Project description</h3>
      <p style="margin:0;white-space:pre-wrap;background:#fafafa;border:1px solid #eee;padding:12px;border-radius:8px">${escapeHtml(
        lead.description
      )}</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const description = body.description?.trim() ?? "";

  if (!name || !email || !description) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (description.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Description too long" },
      { status: 400 }
    );
  }

  const lead = {
    name,
    email,
    description,
    company: body.company?.trim(),
    projectType: body.projectType?.trim(),
    projectTypeOther: body.projectTypeOther?.trim(),
    budget: body.budget?.trim(),
  };

  // Always log so leads are recoverable even before email is configured.
  console.log("[lead]", JSON.stringify(lead));

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL ?? "raju.raman@ourworldenergy.com";
  const from = process.env.LEADS_FROM ?? "BuildXWorks <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New lead: ${name}${lead.company ? ` (${lead.company})` : ""}`,
        html: renderEmail(lead as Parameters<typeof renderEmail>[0]),
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[lead] Resend error", res.status, text);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] Resend fetch failed", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
