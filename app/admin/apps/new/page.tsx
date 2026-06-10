import AppForm from "../AppForm";

export const metadata = { title: "New App | Admin" };

export default function NewAppPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "'Bebas Neue',cursive",
          fontSize: 40,
          letterSpacing: "0.04em",
          color: "#fff",
          marginBottom: 4,
        }}
      >
        NEW APP
      </h1>
      <p style={{ color: "#A1A1AA", fontSize: 13, marginBottom: 32 }}>
        Add a new app to your portfolio.
      </p>
      <AppForm />
    </div>
  );
}
