import { T } from "@/components/Testi";
export default function SegreteriaOrganizzativa() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title"><T k="segreteria-organizzativa.segreteria-organizzativa">SEGRETERIA ORGANIZZATIVA</T></h2>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text text-lg">
              <T k="segreteria-organizzativa.la-segreteria-organizzativa-di-promosan-gestisce">La Segreteria Organizzativa di PromoSan gestisce tutti gli aspetti amministrativi e logistici della medicina del lavoro, garantendo il rispetto delle scadenze normative. Il servizio comprende la gestione completa della pianificazione delle visite mediche, il coordinamento logistico presso le sedi aziendali o le strutture PromoSan, e il supporto amministrativo. La segreteria si occupa della raccolta e archiviazione documentale, del monitoraggio proattivo delle scadenze delle visite periodiche.</T>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}