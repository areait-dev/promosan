// src/app/contatti/page.tsx
import { Metadata } from 'next';
import ContattiHeader from '../../components/Contatti/ContattiHeader';
import ContattiForm from '../../components/Contatti/ContattiForm';
import OrariContatti from '../../components/Contatti/OrariContatti';
import AssistenzaRapida from '../../components/Contatti/AssistenzaRapida';
import PrenotaConsulenza from '../../components/Contatti/PrenotaConsulenza';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { draftMode } from 'next/headers';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Contatti | PromoSan - Richiedi un preventivo personalizzato',
    description: 'Contatta PromoSan per richiedere informazioni sui servizi di medicina del lavoro, unità mobili, welfare aziendale e sicurezza sul lavoro.',
    openGraph: {
      title: 'Contatti | PromoSan',
      description: 'Richiedi un preventivo personalizzato per la tua azienda',
      type: 'website',
      locale: 'it_IT',
      siteName: 'PromoSan'
    }
  };
  
  export default async function ContattiPage() {
    const { isEnabled: draft } = await draftMode();
    let options: GlobalOptions | undefined;
    try {
      options = await getGlobalOptions(draft);
    } catch (error) {
      console.error('[Contatti] Fetch WordPress fallito, uso i default:', error);
    }

    return (
      <>
        <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
        <main>
          <section id="contatti" style={{
            padding: '4rem 0',
            background: '#f9fafb'
          }}>
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 1rem'
            }}>
              
              <ContattiHeader />
              
              {/* CSS Media Query per mobile */}
              <style>{`
                @media (max-width: 768px) {
                  .contatti-layout {
                    flex-direction: column !important;
                  }
                  .colonna-sinistra,
                  .colonna-destra {
                    width: 100% !important;
                  }
                  .colonna-destra {
                    gap: 1rem !important;
                  }
                }
              `}</style>

              {/* Layout con Flexbox */}
              <div className="contatti-layout" style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'flex-start'
              }}>
                
                {/* COLONNA SINISTRA - FORM 2/3 */}
                <div className="colonna-sinistra" style={{
                  width: '66.666%',
                  marginTop: '0'
                }}>
                  <ContattiForm />
                </div>
                
                {/* COLONNA DESTRA - BOX VERTICALI 1/3 */}
                <div className="colonna-destra" style={{
                  width: '33.333%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <OrariContatti
                    telefono={options?.telefono}
                    email={options?.email}
                    orari={options?.orari}
                  />
                  <AssistenzaRapida whatsapp={options?.whatsapp} />
                  <PrenotaConsulenza />
                </div>
                
              </div>
            </div>
          </section>
        </main>
        <Footer options={options} />
      </>
    );
  }