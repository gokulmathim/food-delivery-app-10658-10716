import Layout from "../components/Layout";
import { useCart } from "../contexts/CartContext";
import api from "../services/api";
import { useState } from "react";
import { useRouter } from "next/router";

/**
 * Cart page for reviewing items and creating an order.
 */
export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // PUBLIC_INTERFACE
  const handleCheckout = async () => {
    setPlacing(true);
    setError("");
    try {
      await api.post("/orders", {
        items: items.map(({ id, quantity }) => ({ id, quantity })),
      });
      clearCart();
      router.push("/orders");
    } catch (e) {
      setError(e?.response?.data?.message || "Checkout failed.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Layout>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      style={{ width: "3em" }}
                    />
                  </td>
                  <td>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCheckout} disabled={placing}>
            {placing ? "Placing Order..." : "Checkout"}
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </>
      )}
    </Layout>
  );
}
