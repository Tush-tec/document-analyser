import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import Field from "@/components/auth/Field";
import ErrorBox from "@/components/auth/ErrorBox";
import PrimaryButton from "@/components/auth/PrimaryButton";
import { useAuth } from "@/utils/Context/AuthContext";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { register, isLoading, error } = useAuth();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    await register(form);
  };

  console.log("errorr ------- 23", error);

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start analysing contracts in seconds."
      footer={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={onSubmit}>
        <ErrorBox>{error}</ErrorBox>

        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          minLength={2}
        />
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
          minLength={6}
        />

        <PrimaryButton loading={isLoading}>
          {isLoading ? "Creating account…" : "Create account"}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}
