import Footer from '../Footer/Footer';
import type { GlobalOptions } from '@/lib/wordpress';

const LEGAL_HTML_CSS = `
.legal-wp { color: #475569; font-size: 1rem; line-height: 1.7; }
.legal-wp h2 { font-size: 1.4rem; font-weight: 600; margin: 2rem 0 0.75rem; color: #0f172a; }
.legal-wp h3 { font-size: 1.15rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #0f172a; }
.legal-wp p { margin: 0 0 0.75rem; }
.legal-wp ul, .legal-wp ol { margin: 0 0 0.75rem 1.25rem; }
.legal-wp ul { list-style: disc; }
.legal-wp ol { list-style: decimal; }
.legal-wp a { color: #204c84; text-decoration: underline; }
.legal-wp .wp-block-table, .legal-wp figure.wp-block-table { overflow-x: auto; margin: 0.5rem 0 1rem; }
.legal-wp table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
.legal-wp th { text-align: left; padding: 0.6rem 0.75rem; background: #e2e8f0; color: #0f172a; font-weight: 600; border: 1px solid #cbd5e1; vertical-align: top; }
.legal-wp td { padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; vertical-align: top; }
`;

export interface LegalTable {
  headers: string[];
  rows: string[][];
}

export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  table?: LegalTable;
}

interface LegalPageProps {
  title: string;
  intro?: string;
  sections: LegalSection[];
  options?: GlobalOptions;
  /** HTML dall'editor di WordPress: se presente sostituisce intro e sezioni. */
  html?: string;
}

export default function LegalPage({ title, intro, sections, options, html }: LegalPageProps) {
  return (
    <>
      <main>
        <section style={{ padding: '4rem 0', background: '#f9fafb' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
              {title}
            </h1>
            {html ? (
              <>
                <style>{LEGAL_HTML_CSS}</style>
                <div className="legal-wp" dangerouslySetInnerHTML={{ __html: html }} />
              </>
            ) : (
              <>
            {intro && (
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '2rem' }}>
                {intro}
              </p>
            )}
            {sections.map((section, i) => (
              <div key={i} style={{ marginBottom: '2rem' }}>
                {section.heading && (
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.75rem', color: '#0f172a' }}>
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} style={{ fontSize: '1rem', lineHeight: 1.7, color: '#475569', marginBottom: '0.75rem' }}>
                    {p}
                  </p>
                ))}
                {section.table && (
                  <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                      <thead>
                        <tr>
                          {section.table.headers.map((h, k) => (
                            <th
                              key={k}
                              style={{
                                textAlign: 'left',
                                padding: '0.6rem 0.75rem',
                                background: '#e2e8f0',
                                color: '#0f172a',
                                fontWeight: 600,
                                border: '1px solid #cbd5e1',
                                verticalAlign: 'top',
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, r) => (
                          <tr key={r} style={{ background: r % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                            {row.map((cell, c) => (
                              <td
                                key={c}
                                style={{
                                  padding: '0.6rem 0.75rem',
                                  color: '#475569',
                                  border: '1px solid #cbd5e1',
                                  lineHeight: 1.6,
                                  verticalAlign: 'top',
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer options={options} />
    </>
  );
}
