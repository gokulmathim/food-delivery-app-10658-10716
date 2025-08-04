import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container">{children}</div>
    </>
  );
}
