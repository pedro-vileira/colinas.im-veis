import { NextResponse } from "next/server";
import { resyncNow } from "@/lib/database/repository";

/** Disparo manual/agendado. Protegido por CRON_SECRET. Frequência: definir só após confirmar limites da Kenlo. */
export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }
  try {
    return NextResponse.json(await resyncNow());
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Falha na sincronização." }, { status: 500 });
  }
}
