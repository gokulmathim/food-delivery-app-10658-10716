import Layout from "../components/Layout";
import { useOrders } from "../services/hooks";

/**
 * Order tracking and history page.
 */
export default function OrdersPage() {
  const { data: orders, isLoading } = useOrders();

  return (
    <Layout>
      <h1>My Orders</h1>
      {isLoading ? (
        <div>Loading orders...</div>
      ) : orders && orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Status</th>
              <th>Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found.</div>
      )}
    </Layout>
  );
}
