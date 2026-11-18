import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("E-mail inválido."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Informe o assunto."),
  message: z.string().trim().min(10, "Escreva ao menos 10 caracteres.").max(4000),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "Requisição inválida." }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return NextResponse.json({ message: "Revise os campos destacados.", errors }, { status: 422 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true }); // bot: finge sucesso

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    // Sem destino configurado não fingimos sucesso.
    return NextResponse.json({ message: "Envio por formulário ainda não configurado. Use o WhatsApp ou o e-mail." }, { status: 503 });
  }
  try {
    const { website: _w, ...payload } = parsed.data;
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }) });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contato] falha ao encaminhar", e);
    return NextResponse.json({ message: "Não foi possível enviar agora. Tente novamente em instantes." }, { status: 502 });
  }
}
