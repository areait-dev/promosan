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
              mediaDetails {
                width
                height
              }
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

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data?.page || null;
  } catch (error) {
    console.error("Errore fetch WordPress:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getHomeData();

  // Protezione: se data è null, definiamo un fallback vuoto
  const datiLanding = data?.datiLanding || {};

  return (
    <main className="min-h-screen bg-white font-sans text-dark">
      <Hero 
        subtitle={datiLanding.heroSubtitle} 
        image={datiLanding.heroImage || null} 
      />
    </main>
  );
}