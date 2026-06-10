import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login | Vikrant.exe Admin",
};

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <LoginForm />
    </div>
  );
}
