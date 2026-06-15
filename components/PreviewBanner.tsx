/**
 * components/PreviewBanner.tsx
 *
 * Banner giallo mostrato SOLO quando il Draft Mode di Next.js è attivo.
 * È un Server Component: legge draftMode() lato server e non renderizza
 * nulla in produzione/visita normale.
 *
 * Il bottone "Esci dalla preview" punta a /api/preview/exit che disattiva
 * il Draft Mode e torna in homepage.
 */

import { draftMode } from "next/headers";

export default async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
        padding: "0.6rem 1rem",
        background: "#facc15", // giallo
        color: "#1f2937",
        fontSize: "0.9rem",
        fontWeight: 600,
        textAlign: "center",
        borderBottom: "1px solid #ca8a04",
      }}
    >
      <span>
        ⚠️ Modalità Preview attiva — stai vedendo i contenuti non pubblicati
      </span>
      <a
        href="/api/preview/exit"
        style={{
          padding: "0.3rem 0.9rem",
          background: "#1f2937",
          color: "#fff",
          borderRadius: "9999px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Esci dalla preview
      </a>
    </div>
  );
}
