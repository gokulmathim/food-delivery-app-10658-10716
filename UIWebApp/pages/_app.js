import "../styles/global.css";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// Entry point for all pages; wraps app with providers.
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
