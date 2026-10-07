import { NextResponse } from "next/server";
import { Resend } from "resend";

import { site } from "@/lib/site";

interface QuotePayload {
  name: string;
  company: string;
  phone: string;
  email: string;
  segment: string;
  quantity: string;
  message: string;
  /** Campo-isca invisível: só robôs preenchem. */
  website?: string;
}

const fields: { key: keyof QuotePayload; label: string }[] = [
  { key: "name", label: "Nome" },
  { key: "company", label: "Condomínio" },
  { key: "phone", label: "Telefone / WhatsApp" },
  { key: "email", label: "E-mail" },
  { key: "segment", label: "Serviço" },
  { key: "quantity", label: "Quantidade estimada" },
  { key: "message", label: "Detalhes" },
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Robô preencheu o campo-isca: finge sucesso e não envia nada.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const data = Object.fromEntries(
    fields.map(({ key }) => [key, clean(body[key])]),
  ) as unknown as QuotePayload;

  const digits = data.phone.replace(/\D/g, "");
  if (data.name.length < 3 || data.company.length < 2 || digits.length < 10) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ? data.email
    : undefined;

  const rows = fields
    .filter(({ key }) => data[key])
    .map(
      ({ key, label }) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">${label}</td>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(data[key] as string)}</td></tr>`,
    )
    .join("");

  const text = fields
    .filter(({ key }) => data[key])
    .map(({ key, label }) => `${label}: ${data[key]}`)
    .join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Sem domínio verificado no Resend, o remetente precisa ser onboarding@resend.dev.
    from: process.env.QUOTE_FROM_EMAIL ?? `Site ${site.name} <onboarding@resend.dev>`,
    to: process.env.QUOTE_TO_EMAIL ?? site.email,
    replyTo,
    subject: `Novo orçamento — ${data.company} (${data.name})`,
    html: `<h2 style="font-family:sans-serif">Solicitação de orçamento pelo site</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
    text,
  });

  if (error) {
    console.error("Falha ao enviar e-mail pelo Resend:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
