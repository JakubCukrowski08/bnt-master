"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechCorners } from "@/components/ui/TechCorners";
import { Button } from "@/components/ui/Button";

// ─── Social Media Icons (spójne z Footer.tsx) ───────────────────────────────

const FacebookIcon = ({ className = "" }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>Facebook</title>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.125 0-2.517.236-2.517 1.443v2.53h3.692c-.104 1.848-.314 3.667-.314 3.667h-3.378v7.98H9.101Z" />
  </svg>
);

const LinkedinIcon = ({ className = "" }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const kontaktSchema = z.object({
  name: z
    .string()
    .min(2, "Imię i nazwisko musi mieć min. 2 znaki")
    .max(100, "Imię i nazwisko jest za długie"),
  phone: z
    .string()
    .regex(
      /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/,
      "Podaj prawidłowy numer telefonu (9 cyfr, opcjonalnie +48)"
    ),
  email: z.string().email("Podaj prawidłowy adres e-mail"),
  subject: z.enum(
    [
      "nadzor-inwestorski",
      "generalne-wykonawstwo",
      "kierowanie-budowa",
      "inwestor-zastepczy",
      "inne",
    ],
    { message: "Wybierz temat zapytania" }
  ),
  message: z
    .string()
    .min(20, "Wiadomość musi mieć min. 20 znaków")
    .max(5000, "Wiadomość jest za długa"),
  consent: z.literal(true, {
    error: "Zgoda na przetwarzanie danych jest wymagana",
  }),
  website: z.string().max(0).optional(),
});

type KontaktFormData = z.infer<typeof kontaktSchema>;

const SUBJECT_OPTIONS = [
  { value: "", label: "Wybierz temat zapytania..." },
  { value: "nadzor-inwestorski", label: "Nadzór inwestorski" },
  { value: "generalne-wykonawstwo", label: "Generalne wykonawstwo" },
  { value: "kierowanie-budowa", label: "Kierowanie budową" },
  { value: "inwestor-zastepczy", label: "Inwestor zastępczy" },
  { value: "inne", label: "Inne" },
];

// ─── Input Styling ───────────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-body-mobile lg:text-body-desktop font-body text-brand-text placeholder:text-brand-muted/50 transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary";
const inputDefault = "border-brand-border";
const inputError = "border-red-500 focus:ring-red-500 focus:border-red-500";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-small-mobile text-red-500" role="alert">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" strokeWidth={2} />
      {message}
    </p>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function KontaktPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KontaktFormData>({
    resolver: zodResolver(kontaktSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: undefined,
      message: "",
      consent: undefined,
      website: "",
    },
  });

  const onSubmit = async (data: KontaktFormData) => {
    setFormState("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error?.message || "Wystąpił błąd. Spróbuj ponownie.");
        setFormState("error");
        return;
      }

      setFormState("success");
      reset();
    } catch {
      setServerError("Nie udało się połączyć z serwerem. Sprawdź połączenie internetowe i spróbuj ponownie.");
      setFormState("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── 1. Hero ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 lg:pt-56 lg:pb-48 bg-brand-deepDark w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Reveal>
            <div className="font-mono text-small-mobile tracking-widest text-brand-muted uppercase mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Strona główna
              </Link>
              <span className="mx-3 opacity-50">/</span>
              <span className="text-white">Kontakt</span>
            </div>
          </Reveal>

          <SectionHeader
            eyebrow="Skontaktuj się z nami"
            title="Porozmawiajmy o Twojej inwestycji"
            lead="Odpowiadamy w ciągu 24 godzin roboczych. Wypełnij formularz lub zadzwoń bezpośrednio — chętnie omówimy szczegóły Twojego projektu."
            theme="dark"
            align="left"
            size="xl"
          />
        </div>
      </section>

      {/* ─── 2. Formularz + Dane kontaktowe ──────────────────────── */}
      <section className="py-24 md:py-32 lg:py-48 bg-brand-surface w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
            {/* Lewa: Formularz */}
            <Reveal className="lg:col-span-3" delay={0.1}>
              <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 lg:p-10 h-full">
                <h2 className="text-h3-mobile md:text-h3-tablet lg:text-h3-desktop font-heading font-semibold text-brand-text mb-2">
                  Formularz wyceny
                </h2>
                <p className="text-body-mobile text-brand-muted mb-8">
                  Opisz swój projekt, a my przygotujemy wstępną wycenę.
                </p>

                {formState === "success" ? (
                  /* ── Stan sukcesu ── */
                  <div className="flex flex-col items-center justify-center text-center py-16 lg:py-24">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                      <CheckCircle
                        className="w-8 h-8 text-green-600"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-h3-mobile font-heading font-semibold text-brand-text mb-3">
                      Wiadomość wysłana
                    </h3>
                    <p className="text-body-mobile text-brand-muted max-w-sm mb-8">
                      Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin roboczych na podany adres
                      e-mail.
                    </p>
                    <Button
                      variant="outline"
                      size="md"
                      type="button"
                      onClick={() => setFormState("idle")}
                    >
                      Wyślij kolejną wiadomość
                    </Button>
                  </div>
                ) : (
                  /* ── Formularz ── */
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                    {/* Honeypot — ukryte pole */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                      />
                    </div>

                    {/* Imię i nazwisko */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-small-desktop font-medium text-brand-text mb-2"
                      >
                        Imię i nazwisko <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        placeholder="Jan Kowalski"
                        className={`${inputBase} ${errors.name ? inputError : inputDefault}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                      />
                      <FieldError message={errors.name?.message} />
                    </div>

                    {/* Telefon + E-mail — 2 kolumny */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-small-desktop font-medium text-brand-text mb-2"
                        >
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          placeholder="+48 123 456 789"
                          className={`${inputBase} ${errors.phone ? inputError : inputDefault}`}
                          aria-invalid={!!errors.phone}
                          {...register("phone")}
                        />
                        <FieldError message={errors.phone?.message} />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-small-desktop font-medium text-brand-text mb-2"
                        >
                          E-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          placeholder="jan@firma.pl"
                          className={`${inputBase} ${errors.email ? inputError : inputDefault}`}
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>
                    </div>

                    {/* Temat */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-small-desktop font-medium text-brand-text mb-2"
                      >
                        Temat zapytania <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        className={`${inputBase} ${errors.subject ? inputError : inputDefault} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2352525B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]`}
                        aria-invalid={!!errors.subject}
                        defaultValue=""
                        {...register("subject")}
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.subject?.message} />
                    </div>

                    {/* Wiadomość */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-small-desktop font-medium text-brand-text mb-2"
                      >
                        Wiadomość <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Opisz swój projekt, lokalizację, orientacyjny zakres prac..."
                        className={`${inputBase} resize-y min-h-[120px] ${
                          errors.message ? inputError : inputDefault
                        }`}
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                      <FieldError message={errors.message?.message} />
                    </div>

                    {/* RODO */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        className="mt-1 h-4 w-4 rounded border-brand-border text-brand-primary focus:ring-brand-primary cursor-pointer flex-shrink-0"
                        aria-invalid={!!errors.consent}
                        {...register("consent")}
                      />
                      <label
                        htmlFor="contact-consent"
                        className="text-small-mobile text-brand-muted cursor-pointer leading-relaxed"
                      >
                        Wyrażam zgodę na przetwarzanie danych osobowych w celu udzielenia odpowiedzi
                        na zapytanie (zgodnie z{" "}
                        <Link
                          href="/polityka-prywatnosci"
                          className="underline hover:text-brand-primary transition-colors"
                        >
                          Polityką Prywatności
                        </Link>
                        ). <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {errors.consent && <FieldError message={errors.consent.message} />}

                    {/* Błąd serwera */}
                    {formState === "error" && serverError && (
                      <div
                        className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-small-desktop"
                        role="alert"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" strokeWidth={1.5} />
                        <div>
                          <p className="font-medium">{serverError}</p>
                          <p className="text-red-600/70 mt-1">
                            Możesz też zadzwonić bezpośrednio:{" "}
                            <a href="tel:+48000000000" className="underline font-medium">
                              +48 000 000 000
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                        isLoading={formState === "submitting"}
                        disabled={formState === "submitting"}
                      >
                        {formState === "submitting" ? "Wysyłanie..." : "Wyślij wiadomość"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Prawa: Dane kontaktowe + Mapa */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <Reveal delay={0.2} className="flex-1">
                <div className="group relative bg-white border border-brand-border rounded-xl p-6 sm:p-8 h-full">
                  <TechCorners />

                  <h3 className="text-h4-mobile md:text-h4-desktop font-heading font-semibold text-brand-text mb-6">
                    Dane kontaktowe
                  </h3>

                  <ul className="space-y-6">
                    <li className="flex items-start gap-3">
                      <MapPin
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <div>
                        <span className="block text-small-desktop font-mono text-brand-muted/60 uppercase tracking-widest mb-1">
                          Siedziba
                        </span>
                        <span className="text-body-mobile text-brand-text">
                          ul. Budowlana 12
                          <br />
                          50-000 Wrocław
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <div>
                        <span className="block text-small-desktop font-mono text-brand-muted/60 uppercase tracking-widest mb-1">
                          Telefon
                        </span>
                        <a
                          href="tel:+48000000000"
                          className="text-body-mobile text-brand-text hover:text-brand-primary transition-colors"
                        >
                          +48 000 000 000
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <div>
                        <span className="block text-small-desktop font-mono text-brand-muted/60 uppercase tracking-widest mb-1">
                          E-mail
                        </span>
                        <a
                          href="mailto:biuro@bntbudownictwo.pl"
                          className="text-body-mobile text-brand-text hover:text-brand-primary transition-colors"
                        >
                          biuro@bntbudownictwo.pl
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <div>
                        <span className="block text-small-desktop font-mono text-brand-muted/60 uppercase tracking-widest mb-1">
                          Godziny pracy
                        </span>
                        <span className="text-body-mobile text-brand-text">
                          Pon — Pt: 8:00 — 16:00
                        </span>
                      </div>
                    </li>
                  </ul>

                  {/* Social */}
                  <div className="mt-8 pt-6 border-t border-brand-border/50">
                    <span className="block text-small-desktop font-mono text-brand-muted/60 uppercase tracking-widest mb-4">
                      Social media
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Mapa */}
              <Reveal delay={0.3}>
                <div className="rounded-xl overflow-hidden border border-brand-border shadow-sm h-[280px] lg:h-[300px]">
                  <iframe
                    title="Lokalizacja BNT Budownictwo — Wrocław"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80254.98065893057!2d16.933622563700937!3d51.10788730000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe9c2d4b58abf%3A0xb70956aec205e0f5!2sWroc%C5%82aw!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Szybkie odpowiedzi ────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-t border-brand-border/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Zanim napiszesz"
            title="Najczęstsze pytania"
            align="center"
            size="md"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Zap,
                title: "Odpowiadamy w 24h",
                desc: "Każde zapytanie trafia bezpośrednio do naszego zespołu projektowego. Odpowiemy jeszcze tego samego lub następnego dnia roboczego.",
              },
              {
                icon: MessageSquare,
                title: "Bezpłatna wstępna konsultacja",
                desc: "Pierwsza rozmowa o projekcie jest zawsze bezpłatna. Chętnie omówimy zakres, harmonogram i wstępne koszty.",
              },
              {
                icon: Shield,
                title: "Wrocław i Dolny Śląsk",
                desc: "Działamy na terenie Wrocławia i całego Dolnego Śląska. W przypadku większych projektów — również poza regionem.",
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={0.1 * (idx + 1)}>
                <div className="group relative flex flex-col items-center text-center p-8 bg-brand-surface rounded-xl border border-brand-border/40">
                  <TechCorners />
                  <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-6">
                    <item.icon
                      className="w-6 h-6 text-brand-primary"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-h4-mobile font-heading font-semibold text-brand-text mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body-mobile text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
