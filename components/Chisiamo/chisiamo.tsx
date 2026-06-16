import Image from 'next/image';

export interface ChiSiamoProps {
  title?: string;
  text?: string; // HTML o testo semplice
  fotoTeam?: string; // URL immagine team (da WordPress); fallback al path locale
}

const DEFAULT_TITLE = 'IL TUO PARTNER PER LA MEDICINA DEL LAVORO';
const DEFAULT_TEXT =
  "PromoSan S.r.l. nasce dall'esperienza consolidata di Promotergroup S.p.A., leader nazionale nella gestione della sorveglianza sanitaria e dei servizi integrati per la sicurezza sul lavoro. PromoSan si propone come punto di riferimento nel settore della Medicina del Lavoro, offrendo servizi di eccellenza per la prevenzione, diagnosi e cura delle patologie connesse all'attività lavorativa. La Medicina del Lavoro non è solo un obbligo normativo: è uno strumento fondamentale per tutelare la salute e la sicurezza dei lavoratori, contribuendo al benessere delle persone e alla produttività delle imprese.";

const DEFAULT_FOTO_TEAM = '/assets/img/fototeam.jpg';

export default function ChiSiamo({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
  fotoTeam = DEFAULT_FOTO_TEAM,
}: ChiSiamoProps = {}) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-7xl">
          <h2 className="section-title">{title}</h2>

          <div className="section-content">
            <p
              className="section-text text-justify"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>

          {fotoTeam && (
            <div className="section-content" style={{ marginTop: 'var(--space-xl)' }}>
              <Image
                src={fotoTeam}
                alt="Il team PromoSan"
                width={1200}
                height={675}
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--border-radius-lg)' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}