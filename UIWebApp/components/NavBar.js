import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        🍔 Food Delivery
      </Link>
      <div className="nav-links">
        <Link href="/restaurants">Restaurants</Link>
        <Link href="/orders">My Orders</Link>
        <Link href="/cart">
          Cart {items.length > 0 && <span className="cart-count">({items.length})</span>}
        </Link>
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
      <style jsx>{`
        .navbar {
          padding: 1em;
          background: #fff;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-links > * {
          margin-left: 1em;
        }
        .cart-count {
          color: #d00;
          font-weight: bold;
        }
        .logo {
          font-weight: bold;
          font-size: 1.2em;
        }
      `}</style>
    </nav>
  );
}
