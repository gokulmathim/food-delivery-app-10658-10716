import Layout from "../../components/Layout";
import { useRestaurants } from "../../services/hooks";

export default function RestaurantsPage() {
  const { data: restaurants, isLoading } = useRestaurants();

  return (
    <Layout>
      <h1>All Restaurants</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((r) => (
              <li key={r.id}>
                <a href={`/restaurants/${r.id}`}>
                  <b>{r.name}</b> — {r.cuisine}
                </a>
              </li>
            ))
          ) : (
            <div>No restaurants found.</div>
          )}
        </ul>
      )}
    </Layout>
  );
}
