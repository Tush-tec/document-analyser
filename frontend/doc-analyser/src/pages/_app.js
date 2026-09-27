import { AuthProvider } from "@/utils/Context/AuthContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="mesh-bg" />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            color: "#0a1e33",
            border: "1px solid rgba(30,111,217,0.2)",
            borderRadius: "14px",
            padding: "12px 16px",
            fontSize: "14px",
            boxShadow: "0 10px 30px -10px rgba(10,61,122,0.35)",
          },
          success: {
            iconTheme: { primary: "#1e6fd9", secondary: "#fff" },
          },
          error: {
            style: {
              border: "1px solid rgba(224,82,82,0.3)",
            },
            iconTheme: { primary: "#e05252", secondary: "#fff" },
          },
        }}
      />

      <Component {...pageProps} />
    </AuthProvider>
  );
}
