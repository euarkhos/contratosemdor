import { NextResponse } from "next/server";

/** Verificação simples para deploy / monitorização (sem dependência da BD). */
export function GET() {
  return NextResponse.json({ ok: true });
}
