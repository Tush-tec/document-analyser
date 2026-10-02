import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "@/utils/Context/AuthContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import AppLayout from "@/components/Layout/AppLayout";

// Routes that DON'T require auth
const PUBLIC_ROUTES = ["/login", "/signup"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isPublic = PUBLIC_ROUTES.includes(router.pathname);

    if (token) {
      setIsAuthenticated(true);
    } else if (!isPublic) {
      // no token + protected route → send to login
      router.replace("/login");
    } else {
      // no token + public route → allow
      setIsAuthenticated(false);
    }

    setChecking(false);
  }, [router.pathname]);

  // While checking on first render, render nothing (avoids flash)
  if (checking) return null;

  // If unauthenticated and on a protected route, render nothing
  // (redirect is already in-flight from the effect above)
  const isPublic = PUBLIC_ROUTES.includes(router.pathname);
  if (!isAuthenticated && !isPublic) return null;

  const content = <Component {...pageProps} />;

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
          success: { iconTheme: { primary: "#1e6fd9", secondary: "#fff" } },
          error: {
            style: { border: "1px solid rgba(224,82,82,0.3)" },
            iconTheme: { primary: "#e05252", secondary: "#fff" },
          },
        }}
      />

      {/* Login/signup render bare. Everything else gets the sidebar. */}
      {isPublic || Component.noLayout ? (
        content
      ) : (
        <AppLayout>{content}</AppLayout>
      )}
    </AuthProvider>
  );
}
