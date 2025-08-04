import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
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
      await signup(email, password, name);
      router.push("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button disabled={submitting}>Sign Up</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </Layout>
  );
}
