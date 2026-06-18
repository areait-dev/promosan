import type { Metadata } from "next";
import "./globals.css";
import PreviewBanner from "../components/PreviewBanner";

export const metadata: Metadata = {
  title: "PromoSan - Medicina del Lavoro | Welfare Aziendale | Unità Mobili",
  description: "PromoSan S.r.l. è il tuo partner per la medicina del lavoro, welfare aziendale e servizi sanitari mobili.",
  icons: {
    icon: "/assets/img/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Banner visibile solo in Draft Mode (preview contenuti non pubblicati) */}
        <PreviewBanner />
        {children}
      </body>
    </html>
  );
}