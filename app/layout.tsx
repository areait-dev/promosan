import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import PreviewBanner from "../components/PreviewBanner";
import CookieBanner from "../components/CookieBanner/CookieBanner";

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
        {/* Google Consent Mode v2: nega per default i cookie non tecnici finché l'utente non sceglie */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            try {
              var raw = localStorage.getItem('promosan-cookie-consent');
              if (raw) {
                var p = JSON.parse(raw);
                gtag('consent', 'update', {
                  analytics_storage: p.analytics ? 'granted' : 'denied',
                  ad_storage: p.marketing ? 'granted' : 'denied',
                  ad_user_data: p.marketing ? 'granted' : 'denied',
                  ad_personalization: p.marketing ? 'granted' : 'denied'
                });
              }
            } catch (e) {}
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J6SFHPQRG6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-J6SFHPQRG6');
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Banner visibile solo in Draft Mode (preview contenuti non pubblicati) */}
        <PreviewBanner />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}