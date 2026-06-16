"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { allSpecialtyNames } from "@/content/specialites";
import Button from "./Button";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  specialties = allSpecialtyNames,
}: {
  specialties?: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer le message. Réessayez ou contactez-nous par téléphone."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-kinesis-green/30 bg-kinesis-green/5 p-8 text-center"
      >
        <CheckCircle2 size={40} className="text-kinesis-green" />
        <h3 className="mt-4 text-lg font-bold text-kinesis-violet">
          Message envoyé
        </h3>
        <p className="mt-2 text-sm text-kinesis-grey">
          Merci, nous avons bien reçu votre message et reviendrons vers vous
          rapidement.
        </p>
        <Button
          className="mt-5"
          variant="outline"
          onClick={() => setStatus("idle")}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-kinesis-ink placeholder:text-kinesis-grey-soft focus:border-kinesis-violet focus:outline-none focus:ring-1 focus:ring-kinesis-violet";
  const labelClass = "block text-sm font-medium text-kinesis-ink";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, bots tend to fill it. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Ne pas remplir</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom complet <span className="text-kinesis-green">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="telephone" className={labelClass}>
            Téléphone <span className="text-kinesis-green">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldClass}
            placeholder="+221 ..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label htmlFor="specialite" className={labelClass}>
          Spécialité concernée
        </label>
        <select
          id="specialite"
          name="specialite"
          className={fieldClass}
          defaultValue=""
        >
          <option value="">— Sélectionnez (optionnel) —</option>
          {specialties.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-kinesis-green">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
          placeholder="Comment pouvons-nous vous aider ?"
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Envoi en cours…
          </>
        ) : (
          "Envoyer le message"
        )}
      </Button>

      <p className="text-xs text-kinesis-grey-soft">
        Vos données sont traitées dans le respect de la confidentialité médicale.
        Voir notre{" "}
        <a
          href="/politique-confidentialite"
          className="underline hover:text-kinesis-violet"
        >
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
