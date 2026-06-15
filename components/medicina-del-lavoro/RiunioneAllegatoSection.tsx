export default function RiunioneAllegatoSection() {
  return (
    <section className="section section-white">
      <div className="container">
        <div className="grid-cols-2">
          
          {/* Card 1 */}
          <div className="card flex flex-col">  {/* Aggiunto flex flex-col */}
            <div className="card-body flex flex-col h-full">  {/* Aggiunto flex flex-col h-full */}
              <div className="flex justify-end mb-4">
                <span className="px-3 py-1 text-xs font-bold text-white bg-primary rounded-full">OBBLIGATORIO</span>
              </div>
              <h3 className="card-title">RIUNIONE PERIODICA E RELAZIONE SANITARIA</h3>
              <p className="card-text">
                La riunione periodica, prevista dall'art. 35 del D.Lgs. 81/08 per le aziende con più di 15 dipendenti, si svolge almeno una volta all'anno e coinvolge datore di lavoro, RSPP, Medico Competente e RLS. Durante l'incontro vengono discussi i risultati della sorveglianza sanitaria, l'andamento infortunistico e i programmi di prevenzione. Il Medico Competente presenta la relazione sanitaria annuale con i dati anonimi collettivi della sorveglianza effettuata.
              </p>
              <p className="card-text mt-4">
                Attraverso l'analisi e il confronto con le figure aziendali, i professionisti PromoSan forniscono raccomandazioni concrete che permettono di affinare i protocolli sanitari e ottimizzare le misure preventive, garantendo una tutela sempre più efficace della salute dei lavoratori.
              </p>
              
              {/* Box spinto in fondo con mt-auto */}
              <div className="mt-auto pt-6">  {/* Cambiato mt-6 in mt-auto pt-6 */}
                <div className="p-4 bg-gray-50 rounded-lg ">
                  <div className="text-sm font-bold text-[#2c5282] text-primary">Per quali aziende?</div>
                  <div className="text-sm text-gray-600">Imprese e unità produttive con più di 15 lavoratori</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card flex flex-col">  {/* Aggiunto flex flex-col */}
            <div className="card-body flex flex-col h-full">  {/* Aggiunto flex flex-col h-full */}
              <div className="flex justify-end mb-4">
                <span className="px-3 py-1 text-xs font-bold text-white bg-secondary rounded-full">TRASMISSIONE</span>
              </div>
              <h3 className="card-title">ALLEGATO 3B</h3>
              <p className="card-text">
                L'Allegato 3B è un adempimento previsto dall'art. 40 del D.Lgs. 81/08 che prevede la trasmissione annuale all'INAIL dei dati aggregati sanitari e di rischio dei lavoratori sottoposti a sorveglianza sanitaria.
              </p>
              <p className="card-text mt-4">
                Il documento raccoglie in forma anonima le informazioni relative alle visite mediche, ai rischi lavorativi presenti in azienda e ai giudizi di idoneità espressi nell'anno precedente. La trasmissione avviene esclusivamente per via telematica attraverso il portale INAIL.
              </p>
              
              {/* Box spinto in fondo con mt-auto */}
              <div className="mt-auto pt-6">  {/* Cambiato mt-6 in mt-auto pt-6 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-[#2c5282] text-secondary">Scadenza annuale</div>
                  <div className="text-sm text-gray-600">Trasmissione entro il 31 Marzo dell'anno successivo</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}