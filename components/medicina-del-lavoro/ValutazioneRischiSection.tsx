export default function ValutazioneRischiSection() {
  return (
    <section className="section section-white" id="valutazione-rischi">
      <div className="container">
        
        {/* Header Section */}
        <div className="section-header">
          <h2 className="section-title">VALUTAZIONE DEI RISCHI E PROTOCOLLO SANITARIO</h2>
          <p className="section-subtitle">
            Il Medico Competente partecipa attivamente alla <strong className="text-primary">valutazione dei rischi</strong> aziendali attraverso sopralluoghi negli ambienti di lavoro, l'analisi delle mansioni e la partecipazione alle riunioni periodiche sulla sicurezza. Questo contributo permette di identificare i rischi specifici per la salute e stabilire quando è necessario attivare la sorveglianza sanitaria.
          </p>
        </div>

        {/* Box Protocollo Sanitario - Stile coordinato con Nomina Medico */}
        <div className="protocol-box p-8 rounded-2xl" style={{
          background: 'linear-gradient(135deg, rgba(44, 82, 130, 0.05) 0%, rgba(66, 153, 225, 0.03) 100%)',
          border: '1px solid rgba(44, 82, 130, 0.1)',
          borderRadius: 'var(--border-radius-xl)',
          padding: '2.5rem',
          transition: 'all 0.4s ease'
        }}>
          
          {/* Titolo Protocollo - Stesso colore del titolo principale */}
          <div className="mb-8">
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--color-primary)',
              marginBottom: '0',
              position: 'relative',
              display: 'inline-block',
              paddingBottom: '10px'
            }}>
              PROTOCOLLO SANITARIO
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                borderRadius: '2px'
              }}></span>
            </h3>
          </div>

          {/* Contenuto - Nessuna animazione sul testo */}
          <div>
            <p className="text-gray-700 mb-6" style={{
              lineHeight: '1.8',
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem',
              color: 'var(--color-gray-700)'
            }}>
              Il protocollo sanitario è lo strumento che definisce come viene effettuata la sorveglianza sanitaria. Il Medico Competente lo elabora in base ai rischi identificati e agli standard scientifici più aggiornati, individuando per ogni mansione gli accertamenti necessari: visite mediche, esami strumentali, analisi di laboratorio e consulenze specialistiche.
            </p>

            {/* Testo accertamenti - SENZA BOX, solo testo stilizzato */}
            <div style={{
              paddingTop: '1.5rem',
              borderTop: '2px solid rgba(44, 82, 130, 0.1)',
              marginTop: '1rem'
            }}>
              <p className="text-gray-800 font-medium" style={{ 
                lineHeight: '1.7', 
                margin: 0,
                color: 'var(--color-gray-800)',
                fontSize: '1.05rem',
                fontWeight: '600'
              }}>
                Tutti gli accertamenti sono mirati al rischio specifico e il meno invasivi possibile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}