import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
      router.push("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          required
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button disabled={submitting}>Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <p>
        No account? <a href="/signup">Sign up</a>
      </p>
    </Layout>
  );
}
