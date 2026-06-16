"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Connexion impossible.");
      const from =
        new URLSearchParams(window.location.search).get("from") || "/admin";
      router.replace(from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
      setLoading(false);
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-kinesis-ink focus:border-kinesis-violet focus:outline-none focus:ring-1 focus:ring-kinesis-violet";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-5">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-white p-8 shadow-sm">
        <Image
          src="/logo.svg"
          alt="Kinesis Réadaptation"
          width={170}
          height={36}
          className="mx-auto h-9 w-auto"
        />
        <h1 className="mt-6 text-center text-lg font-bold text-kinesis-violet">
          Espace de gestion
        </h1>
        <p className="mt-1 text-center text-sm text-kinesis-grey">
          Connectez-vous pour gérer le site.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-kinesis-ink">
              Identifiant
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-kinesis-ink">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-kinesis-violet px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#46008f] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Connexion…
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
