/**
 * app/api/preview/exit/route.ts
 *
 * Disattiva il Draft Mode e riporta l'utente alla homepage.
 * Richiamato dal bottone "Esci dalla preview" del PreviewBanner.
 */

import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(request: NextRequest) {
  // Disattiva il Draft Mode (rimuove il cookie di bozza).
  const draft = await draftMode();
  draft.disable();

  // Torna alla homepage.
  return NextResponse.redirect(new URL("/", request.url));
}
