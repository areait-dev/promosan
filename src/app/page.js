import Hero from '../components/hero';
import Header from '../components/header';

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

  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 10 }
  });

  const json = await res.json();
  return json.data.page;
}

export default async function Home() {
  const data = await getHomeData();

  return (
    <main className="min-h-screen bg-white font-sans text-dark">
      {/* Passiamo i dati specifici al componente. 
          Così Hero non sa nulla di GraphQL, riceve solo quello che gli serve. 
      */}
      <Hero 
        subtitle={data.datiLanding.heroSubtitle} 
        image={data.datiLanding.heroImage} 
      />
      
      {/* Qui in futuro aggiungeremo:
          <Features data={data.datiLanding.features} /> 
      */}
    </main>
  );
}