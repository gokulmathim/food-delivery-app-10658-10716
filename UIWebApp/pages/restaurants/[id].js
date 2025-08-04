import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useMenu } from "../../services/hooks";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";

/**
 * Restaurant menu and ordering page.
 */
export default function RestaurantMenuPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: menu, isLoading } = useMenu(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState({});

  // Handle adding item to cart
  const handleAdd = (item) => {
    addItem({ ...item, quantity: qty[item.id] || 1 });
  };

  return (
    <Layout>
      <h1>Menu</h1>
      {isLoading ? (
        <div>Loading menu...</div>
      ) : menu && menu.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Dish</th>
              <th>Description</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((dish) => (
              <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>{dish.description}</td>
                <td>${dish.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={qty[dish.id] || 1}
                    onChange={(e) =>
                      setQty({ ...qty, [dish.id]: Number(e.target.value) })
                    }
                    style={{ width: "3em" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleAdd(dish)}>Add to cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No menu available.</div>
      )}
    </Layout>
  );
}
