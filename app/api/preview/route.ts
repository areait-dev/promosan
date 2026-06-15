/**
 * app/api/preview/route.ts
 *
 * Attiva il Draft Mode di Next.js per visualizzare i contenuti non pubblicati.
 * Aperto da WordPress (bottone "Vedi nel frontend" nella admin bar) in un nuovo tab.
 *
 * Sicurezza: valida il parametro `secret` contro WP_PREVIEW_SECRET (.env.local).
 * Dopo l'attivazione redirige alla route corrispondente a post_type + slug.
 */

import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { resolvePreviewPath } from "@/lib/paths";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "";
  const postType = searchParams.get("post_type") ?? "page";

  // 1. Validazione del secret.
  if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: "Secret non valido" },
      { status: 401 }
    );
  }

  // 2. Attivazione del Draft Mode (imposta il cookie di bozza).
  const draft = await draftMode();
  draft.enable();

  // 3. Redirect alla pagina corretta in base al contenuto.
  const path = resolvePreviewPath(postType, slug);
  return NextResponse.redirect(new URL(path, request.url));
}
