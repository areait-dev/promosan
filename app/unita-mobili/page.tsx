import HeroUnitaMobili from '../../components/Unita-mobili/HeroUnitaMobili';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import VantaggiUnitaMobili from '../../components/Unita-mobili/VantaggiUnitaMobili';
import CaratteristicheServizio from '../../components/Unita-mobili/CaratteristicheServizio';
import { draftMode } from 'next/headers';
import { getGlobalOptions, type GlobalOptions } from '@/lib/wordpress';

export const revalidate = 60;

export default async function UnitaMobiliPage() {
  const { isEnabled: draft } = await draftMode();
  let options: GlobalOptions | undefined;
  try {
    options = await getGlobalOptions(draft);
  } catch (error) {
    console.error('[UnitaMobili] Fetch WordPress fallito, uso i default:', error);
  }

  return (
    <main>
      <Navbar areaRiservataUrl={options?.areaRiservataUrl} />
      <HeroUnitaMobili />
      <CaratteristicheServizio />
      <VantaggiUnitaMobili />
      <Footer options={options} />
    </main>
  );
}
