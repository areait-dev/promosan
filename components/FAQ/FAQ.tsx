'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, BriefcaseMedical, FileSignature } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { FaqItem } from '../../lib/wordpress';

export interface FAQProps {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

const DEFAULT_TITLE = 'DOMANDE FREQUENTI';
const DEFAULT_SUBTITLE =
  'Trova le risposte alle domande più comuni sui nostri servizi, costi, normative e procedure.';

// Fallback usato finché il fetch da WordPress non è collegato.
// answer è HTML (in WordPress = editor dei contenuti del CPT "faq").
const DEFAULT_ITEMS: FaqItem[] = [
  {
    categoria: 'servizi',
    question: 'Quanto costa il servizio di medicina del lavoro?',
    answer:
      '<p>I costi variano in base a:</p><ul><li>Numero di lavoratori: preventivi personalizzati</li><li>Tipologia di rischi presenti in azienda</li><li>Frequenza delle visite richieste</li></ul><p>Offriamo un <strong>costo standardizzato</strong> su tutto il territorio nazionale.</p>',
  },
  {
    categoria: 'servizi',
    question: 'Le unità mobili sono presenti in tutta Italia?',
    answer:
      '<p><strong>Sì, copriamo tutto il territorio nazionale</strong> grazie alla nostra rete di partner qualificati: programmazione flessibile, costi standardizzati e attrezzature complete a bordo.</p>',
  },
  {
    categoria: 'servizi',
    question: 'Cosa include il pacchetto welfare aziendale?',
    answer:
      '<p>Pacchetti personalizzabili che includono: check-up, screening, visite specialistiche e assistenza psicologica.</p>',
  },
  {
    categoria: 'normative',
    question: 'Come funziona la nomina del medico competente?',
    answer:
      '<p>Processo in 4 fasi: valutazione rischi, nomina formale, piano sorveglianza, gestione continuativa. Documentazione conforme al D.Lgs. 81/08.</p>',
  },
  {
    categoria: 'normative',
    question: 'Quali sono i tempi per le visite mediche?',
    answer:
      '<p>Tempi medi: <strong>Unità Mobili</strong> 7-10 giorni lavorativi, <strong>Sedi Fisse</strong> 10-15 giorni lavorativi. Per le urgenze sono disponibili slot entro 48h.</p>',
  },
  {
    categoria: 'normative',
    question: 'Che documentazione serve per iniziare?',
    answer:
      '<p>Documenti necessari: documenti aziendali (P.IVA, visura), lista lavoratori con mansioni, DVR aggiornato (se disponibile). Ti aiutiamo nella preparazione se mancano documenti.</p>',
  },
];

export default function FAQ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  items = DEFAULT_ITEMS,
}: FAQProps = {}) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const source = items.length ? items : DEFAULT_ITEMS;
  const servizi = source.filter((f) => f.categoria === 'servizi');
  const normative = source.filter((f) => f.categoria === 'normative');

  const handleFaqClick = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setActiveFaq(activeFaq === key ? null : key);
  };

  const renderColumn = (
    list: FaqItem[],
    categoryIndex: number,
    columnTitle: string,
    ColumnIcon: ComponentType<SVGProps<SVGSVGElement>>
  ) => (
    <div className="faq-column">
      <h3 className="faq-column-title">
        <ColumnIcon className="h-4 w-4" />
        {columnTitle}
      </h3>

      <div className="faq-items">
        {list.map((faq, index) => {
          const isActive = activeFaq === `${categoryIndex}-${index}`;

          return (
            <div
              key={index}
              className={`faq-item ${isActive ? 'active' : ''}`}
              onClick={() => handleFaqClick(categoryIndex, index)}
            >
              <div className="faq-question">
                <h4>{faq.question}</h4>
                <ChevronDown className={`faq-question-icon h-4 w-4 ${isActive ? 'rotated' : ''}`} />
              </div>

              <div className={`faq-answer ${isActive ? 'visible' : ''}`}>
                <div
                  className="faq-answer-content"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="faq" className="section section-light">
      <div className="container">
        {/* Header */}
        <div className="section-header faq-header">
          <div className="faq-badge">
            <span className="faq-badge-icon">
              <HelpCircle className="h-4 w-4" />
            </span>
            FAQ
          </div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <style jsx>{`
          .faq-header {
            text-align: left;
            margin-bottom: var(--space-xl);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .faq-badge {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            color: var(--color-white);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: var(--space-sm);
            box-shadow: 0 4px 10px rgba(44, 82, 130, 0.15);
          }

          .faq-badge-icon {
            background-color: var(--color-white);
            color: var(--color-primary);
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.65rem;
          }

          .faq-header .section-title {
            margin-bottom: var(--space-xs);
            color: var(--color-dark);
            font-weight: 800;
            font-size: clamp(1.8rem, 4vw, 2.4rem);
          }

          .faq-header .section-subtitle {
            margin-bottom: 0;
            max-width: 800px;
            color: var(--color-gray-600);
            font-size: var(--text-base);
          }
        `}</style>

        {/* FAQ Grid */}
        <div className="faq-grid">
          {renderColumn(servizi, 0, 'Servizi & Costi', BriefcaseMedical)}
          {renderColumn(normative, 1, 'Normative & Procedure', FileSignature)}
        </div>
      </div>
    </section>
  );
}
