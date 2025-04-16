"use client";

import { signUp } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <input
        className="border p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white py-2 px-4 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
}
