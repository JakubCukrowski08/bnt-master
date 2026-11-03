import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Formularz Wyceny | BNT Budownictwo Wrocław",
  description:
    "Skontaktuj się z BNT Budownictwo. Wypełnij formularz wyceny lub zadzwoń — odpowiadamy w ciągu 24h. Nadzór inwestorski, generalne wykonawstwo, Wrocław i Dolny Śląsk.",
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
