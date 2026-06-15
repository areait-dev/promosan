/**
 * app/api/revalidate/route.ts
 *
 * Endpoint chiamato da WordPress (hook save_post) per rigenerare on-demand
 * le pagine Next.js coinvolte quando un contenuto viene salvato.
 *
 * Sicurezza: valida l'header X-WP-Revalidate-Token contro WP_REVALIDATE_TOKEN
 * (definito in .env.local). Senza token valido -> 401.
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { resolveRevalidatePaths } from "@/lib/paths";

export async function POST(request: NextRequest) {
  // 1. Validazione del token condiviso.
  const token = request.headers.get("x-wp-revalidate-token");
  if (!token || token !== process.env.WP_REVALIDATE_TOKEN) {
    return NextResponse.json(
      { revalidated: false, message: "Token non valido" },
      { status: 401 }
    );
  }

  // 2. Lettura del payload inviato da WordPress.
  let postType = "";
  let slug = "";
  try {
    const body = await request.json();
    postType = String(body?.post_type ?? "");
    slug = String(body?.slug ?? "");
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Body JSON non valido" },
      { status: 400 }
    );
  }

  // 3. Rigenerazione di tutte le route coinvolte dal contenuto salvato.
  const paths = resolveRevalidatePaths(postType, slug);
  for (const path of paths) {
    revalidatePath(path);
  }

  // 4. Risposta. `path` riporta la route primaria (la prima della lista).
  return NextResponse.json({
    revalidated: true,
    path: paths[0],
    paths,
    now: Date.now(),
  });
}
