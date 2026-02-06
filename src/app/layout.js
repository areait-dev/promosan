import { Titillium_Web } from 'next/font/google';
import "./globals.css";
import Header from '../components/header';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-titillium', // Definiamo una variabile CSS
});

export const metadata = {
  title: "Promo.san - Medicina del Lavoro e Sicurezza",
  description: "Creato con Next.js e WordPress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body 
        className={`${titillium.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}