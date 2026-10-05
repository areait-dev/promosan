'use client';
import { T } from "@/components/Testi";

export default function RiunioneAllegatoSection() {
  return (
    <section className="section section-white" id="riunione-allegato" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="riunione-allegato-grid">
          
          {/* Column 1 */}
          <div className="ra-column">
            <h3 className="ra-section-title"><T k="riunione-allegato-section.riunione-periodica-e-relazione-sanitaria">RIUNIONE PERIODICA E RELAZIONE SANITARIA</T></h3>
            <div className="ra-card">
              <div className="ra-card-header">
                <span className="ra-badge badge-obbligatorio"><T k="riunione-allegato-section.obbligatorio-art-35">OBBLIGATORIO Art. 35</T></span>
              </div>
              <div className="ra-card-body">
                <p className="ra-card-text">
                  <T k="riunione-allegato-section.la-riunione-periodica-prevista-dall-art">La riunione periodica, prevista dall'art. 35 del D.Lgs. 81/08 per le aziende con più di 15 dipendenti, si svolge almeno una volta all'anno e coinvolge datore di lavoro, RSPP, Medico Competente e RLS. Durante l'incontro vengono discussi i risultati della sorveglianza sanitaria, l'andamento infortunistico e i programmi di prevenzione. Il Medico Competente presenta la relazione sanitaria annuale con i dati anonimi collettivi della sorveglianza effettuata.</T>
                </p>
                <p className="ra-card-text mt-4">
                  <T k="riunione-allegato-section.attraverso-l-analisi-e-il-confronto">Attraverso l'analisi e il confronto con le figure aziendali, i professionisti PromoSan forniscono raccomandazioni concrete che permettono di affinare i protocolli sanitari e ottimizzare le misure preventive, garantendo una tutela sempre più efficace della salute dei lavoratori.</T>
                </p>
              </div>
              
              <div className="ra-bottom-box">
                <div className="ra-box-title"><T k="riunione-allegato-section.per-quali-aziende">Per quali aziende?</T></div>
                <div className="ra-box-desc"><T k="riunione-allegato-section.imprese-e-unita-produttive-con-piu">Imprese e unità produttive con più di 15 lavoratori</T></div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="ra-column">
            <h3 className="ra-section-title"><T k="riunione-allegato-section.allegato-3b">ALLEGATO 3B</T></h3>
            <div className="ra-card">
              <div className="ra-card-header">
                <span className="ra-badge badge-trasmissione"><T k="riunione-allegato-section.trasmissione-art-40">TRASMISSIONE Art. 40</T></span>
              </div>
              <div className="ra-card-body">
                <p className="ra-card-text">
                  <T k="riunione-allegato-section.l-allegato-3b-e-un-adempimento">L'Allegato 3B è un adempimento previsto dall'art. 40 del D.Lgs. 81/08 che prevede la trasmissione annuale all'INAIL dei dati aggregati sanitari e di rischio dei lavoratori sottoposti a sorveglianza sanitaria.</T>
                </p>
                <p className="ra-card-text mt-4">
                  <T k="riunione-allegato-section.il-documento-raccoglie-in-forma-anonima">Il documento raccoglie in forma anonima le informazioni relative alle visite mediche, ai rischi lavorativi presenti in azienda e ai giudizi di idoneità espressi nell'anno precedente. La trasmissione avviene esclusivamente per via telematica attraverso il portale INAIL.</T>
                </p>
              </div>
              
              <div className="ra-bottom-box">
                <div className="ra-box-title"><T k="riunione-allegato-section.scadenza-annuale">Scadenza annuale</T></div>
                <div className="ra-box-desc"><T k="riunione-allegato-section.trasmissione-entro-il-31-marzo-dell">Trasmissione entro il 31 Marzo dell'anno successivo</T></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        .riunione-allegato-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          width: 100%;
        }

        .ra-column {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .ra-section-title {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 800;
          color: #1a365d;
          margin-bottom: 1.5rem;
          line-height: 1.35;
          letter-spacing: 0.5px;
          min-height: 2.8rem; /* Keeps titles aligned if one wraps */
          display: flex;
          align-items: flex-end;
        }

        .ra-card {
          background: var(--color-white);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .ra-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(44, 82, 130, 0.06);
        }

        .ra-card-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.2rem;
        }

        .ra-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 10px;
          font-weight: 800;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-obbligatorio {
          background: #0f2a4a;
        }

        .badge-trasmissione {
          background: #3b82f6;
        }

        .ra-card-body {
          flex: 1;
          margin-bottom: 2rem;
        }

        .ra-card-text {
          color: #475569;
          line-height: 1.7;
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
        }

        .ra-bottom-box {
          background-color: #f4f7fa;
          border-left: 4px solid #1a365d;
          border-radius: 4px 12px 12px 4px;
          padding: 16px 20px;
          margin-top: auto;
        }

        .ra-box-title {
          font-size: 11px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }

        .ra-box-desc {
          color: #334155;
          font-weight: 600;
          font-size: clamp(0.8rem, 2.5vw, 0.88rem);
          line-height: 1.45;
        }

        @media (max-width: 1024px) {
          .ra-section-title {
            min-height: auto;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 900px) {
          .riunione-allegato-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .ra-card {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}