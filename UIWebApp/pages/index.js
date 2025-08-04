import Layout from "../components/Layout";
import { useState } from "react";
import { useRestaurants } from "../services/hooks";

/**
 * The landing page provides restaurant search and browsing features.
 */
export default function HomePage() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const { data: restaurants, isLoading } = useRestaurants({
    search: query,
    cuisine,
  });

  return (
    <Layout>
      <h1>Find Your Next Meal</h1>
      <form
        style={{ display: "flex", gap: "1em", marginBottom: "2em" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          placeholder="Search restaurants or dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          {/* To be dynamically fetched in a more advanced version */}
          <option value="pizza">Pizza</option>
          <option value="indian">Indian</option>
          <option value="chinese">Chinese</option>
        </select>
      </form>

      {isLoading ? (
        <div>Loading restaurants...</div>
      ) : (
        <div>
          {restaurants && restaurants.length > 0 ? (
            <ul>
              {restaurants.map((r) => (
                <li key={r.id}>
                  <a href={`/restaurants/${r.id}`}>
                    <b>{r.name}</b> — {r.cuisine}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div>No restaurants found.</div>
          )}
        </div>
      )}
    </Layout>
  );
}
