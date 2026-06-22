import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import type { GlobalOptions } from '@/lib/wordpress';

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
}

export default function LegalPage({ title, intro, sections, options }: LegalPageProps) {
  return (
    <>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <main>
        <section style={{ padding: '4rem 0', background: '#f9fafb' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
              {title}
            </h1>
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
          </div>
        </section>
      </main>
      <Footer options={options} />
    </>
  );
}
