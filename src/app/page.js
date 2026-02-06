import Hero from '../components/hero';

async function getHomeData() {
  const query = `
    query GetHome {
      page(idType: URI, id: "/") {
        datiLanding {
          heroSubtitle
          heroImage {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 10 }
    });

    const json = await res.json();

    // --- INIZIO SNIPPET DI DEBUG ---
    // Questo log apparirà nel terminale (in locale) o nei log di Vercel (online)
    console.log("DEBUG WP DATA:", JSON.stringify(json, null, 2));
    // --- FINE SNIPPET DI DEBUG ---

    return json?.data?.page || null;
  } catch (error) {
    console.error("Errore durante il fetch:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getHomeData();

  // Se 'data' è null o 'datiLanding' non esiste, usiamo un oggetto vuoto per non crashare
  const datiLanding = data?.datiLanding || {};

  return (
    <main className="min-h-screen bg-white font-sans text-dark overflow-x-hidden">
      <Hero 
        subtitle={datiLanding.heroSubtitle || "Benvenuti"} 
        image={datiLanding.heroImage || null} 
      />
    </main>
  );
}