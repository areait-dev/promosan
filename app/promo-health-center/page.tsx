// app/promo-health-center/page.tsx
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HeroSedi from '../../components/PromoHealthCenter/HeroSedi';
import SediInteractive from '../../components/PromoHealthCenter/SediInteractive';
import RetePartner from '../../components/PromoHealthCenter/RetePartner';
import { draftMode } from 'next/headers';
import {
  getGlobalOptions,
  getSedi,
  getPageFields,
  mediaUrl,
  type GlobalOptions,
  type Sede,
  type PageContentFields,
} from '@/lib/wordpress';

export const revalidate = 60;

export const metadata = {
  title: 'Le Nostre Sedi | Promo Health Center - Sicilia e Veneto',
  description:
    'Scopri le nostre sedi in Sicilia e Veneto. Medicina del lavoro, sorveglianza sanitaria e servizi per la salute dei lavoratori.',
};

interface SedeData {
  regione: string;
  indirizzo: string;
  telefono: string;
  email: string;
  mappaUrl: string;
  mappaTitolo: string;
  googleMapsLink: string;
  image?: string;
}

// Fallback usato finché il fetch da WordPress non è collegato.
const FALLBACK_SEDI_DATA: { sicilia: SedeData; veneto: SedeData; piemonte: SedeData } = {
  sicilia: {
    regione: 'Sicilia',
    indirizzo: 'Via del Carrubbo sn, Vittoria (RG)',
    telefono: '+39 095 1234567',
    email: 'sicilia@promohealthcenter.it',
    mappaUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.1234!2d14.5278!3d36.9515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313f123456789ab%3A0x123456789abcdef!2sVia%20del%20Carrubbo%2C%20Vittoria%20RG!5e0!3m2!1sit!2sit!4v1234567890',
    mappaTitolo: 'Mappa sede Sicilia',
    googleMapsLink: 'https://maps.google.com/?q=Via+del+Carrubbo+Vittoria+RG',
  },
  veneto: {
    regione: 'Veneto',
    indirizzo: 'Via Europa Unita 12/A, Postioma di Paese (TV)',
    telefono: '+39 041 1234567',
    email: 'veneto@promohealthcenter.it',
    mappaUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1234!2d12.1234!3d45.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477e123456789abc%3A0x123456789abcdef!2sVia%20Europa%20Unita%2012%2FA%2C%20Postioma%20di%20Paese%20TV!5e0!3m2!1sit!2sit!4v1234567890',
    mappaTitolo: 'Mappa sede Veneto',
    googleMapsLink: 'https://maps.google.com/?q=Via+Europa+Unita+12+A+Postioma+Paese+TV',
  },
  piemonte: {
    regione: 'Piemonte',
    indirizzo: 'Via Trento, 21, Grugliasco (TO)',
    telefono: '0932862613',
    email: 'info@promosan.eu',
    mappaUrl: 'https://www.google.com/maps?q=Via+Trento,+21,+10095+Grugliasco+TO&output=embed',
    mappaTitolo: 'Mappa sede Piemonte',
    googleMapsLink: 'https://maps.app.goo.gl/5ZQqgvfGGXnptBEx5',
  },
};

const FALLBACK_SERVIZI = [
  'Medicina del Lavoro',
  'Sorveglianza Sanitaria',
  'Visite Mediche',
  'Certificati di Idoneità',
  'Visite Specialistiche',
  'Formazione Sicurezza',
];

// Converte l'array di Sede (lib) nella struttura attesa da SediInteractive.
function buildSediData(sedi: Sede[]): { sicilia: SedeData; veneto: SedeData; piemonte: SedeData } {
  const result = { ...FALLBACK_SEDI_DATA };
  for (const sede of sedi) {
    const regione = (sede.regione || '').toLowerCase();
    const data: SedeData = {
      regione: sede.regione,
      indirizzo: sede.indirizzo,
      telefono: sede.telefono,
      email: sede.email,
      mappaUrl: sede.mappaUrl,
      mappaTitolo: sede.mappaTitolo,
      googleMapsLink: sede.googleMapsLink,
      image: sede.image?.url,
    };
    if (regione.includes('sicilia')) result.sicilia = data;
    else if (regione.includes('veneto')) result.veneto = data;
    else if (regione.includes('piemonte')) result.piemonte = data;
  }
  return result;
}

export default async function SediPage() {
  const { isEnabled: draft } = await draftMode();

  let options: GlobalOptions | undefined;
  let sedi: Sede[] = [];
  let pageContent: PageContentFields | null = null;

  try {
    [options, sedi, pageContent] = await Promise.all([
      getGlobalOptions(draft),
      getSedi(draft),
      getPageFields<PageContentFields>('promo-health-center', draft),
    ]);
  } catch (error) {
    console.error('[PromoHealthCenter] Fetch WordPress fallito, uso i default:', error);
  }

  const sediData = sedi.length ? buildSediData(sedi) : FALLBACK_SEDI_DATA;
  const servizi =
    sedi.find((s) => s.servizi?.length)?.servizi ?? FALLBACK_SERVIZI;
  const sediContent = pageContent?.sedi;
  const heroBg = await mediaUrl(sediContent?.hero?.immagine, draft);
  const retePartnerImage = await mediaUrl(sediContent?.rete_partner?.immagine, draft);

  return (
    <main className="sedi-page">
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <HeroSedi
        title={sediContent?.hero?.titolo || undefined}
        subtitle={sediContent?.hero?.sottotitolo || undefined}
        btn1Label={sediContent?.hero?.btn1_label || undefined}
        btn1Link={sediContent?.hero?.btn1_link || undefined}
        btn2Label={sediContent?.hero?.btn2_label || undefined}
        btn2Link={sediContent?.hero?.btn2_link || undefined}
        backgroundImage={heroBg}
      />
      <div id="strutture-section" className="container mx-auto px-4 md:px-6 py-16">
        <SediInteractive sediData={sediData} servizi={servizi} />
      </div>
      <RetePartner
        title={sediContent?.rete_partner?.titolo || undefined}
        text={sediContent?.rete_partner?.testo || undefined}
        image={retePartnerImage || undefined}
      />
      <Footer options={options} />
    </main>
  );
}
