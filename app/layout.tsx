import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import PreviewBanner from "../components/PreviewBanner";

export const metadata: Metadata = {
  title: "PromoSan - Medicina del Lavoro | Welfare Aziendale | Unità Mobili",
  description: "PromoSan S.r.l. è il tuo partner per la medicina del lavoro, welfare aziendale e servizi sanitari mobili.",
  icons: {
    icon: "/assets/img/favicon.png",
  },
  verification: {
    google: '8Q7CxYUQXmSfRYy7qZqT2I6GWXOVIPko0zd-44Eag_c',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J6SFHPQRG6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J6SFHPQRG6');
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Banner visibile solo in Draft Mode (preview contenuti non pubblicati) */}
        <PreviewBanner />
        {children}
      </body>
    </html>
  );
}