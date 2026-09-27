import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ErrorBox from "@/components/auth/ErrorBox";
import Field from "@/components/auth/Field";
import GoogleButton from "@/components/auth/GoogleButton";
import PrimaryButton from "@/components/auth/PrimaryButton";
import { useAuth } from "@/utils/Context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, isLoading, error } = useAuth();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  const onGoogle = () => alert("Google sign-in coming next step");

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your documents."
      footer={
        <>
          New here? <Link href="/signup">Create an account</Link>
        </>
      }
    >
      <form onSubmit={onSubmit}>
        <ErrorBox>{error}</ErrorBox>

        <Field
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <Field
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
        />

        <PrimaryButton loading={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </PrimaryButton>

        <div className="flex items-center gap-3 my-5 text-muted text-xs">
          <div className="flex-1 h-px bg-ocean-500/20" />
          OR
          <div className="flex-1 h-px bg-ocean-500/20" />
        </div>

        <GoogleButton onClick={onGoogle} />
      </form>
    </AuthShell>
  );
}
