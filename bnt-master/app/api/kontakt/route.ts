import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
  // Honeypot — musi być puste
  website: z.string().max(0, "").optional(),
});

const SUBJECT_LABELS: Record<string, string> = {
  "nadzor-inwestorski": "Nadzór inwestorski",
  "generalne-wykonawstwo": "Generalne wykonawstwo",
  "kierowanie-budowa": "Kierowanie budową",
  "inwestor-zastepczy": "Inwestor zastępczy",
  inne: "Inne",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Walidacja Zod
    const result = kontaktSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: { message: "Błąd walidacji formularza", code: "VALIDATION_ERROR", fields: fieldErrors } },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check — jeśli wypełnione, bot
    if (data.website && data.website.length > 0) {
      // Udajemy sukces, żeby bot nie wiedział
      return NextResponse.json({ success: true });
    }

    // Sprawdź klucz Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey || resendApiKey === "your_resend_api_key") {
      console.warn(
        "[KONTAKT] Klucz RESEND_API_KEY nie jest skonfigurowany. E-mail NIE został wysłany. Dane formularza:",
        { name: data.name, email: data.email, subject: data.subject }
      );
      // Zwracamy sukces, żeby frontend działał w trybie dev
      return NextResponse.json({
        success: true,
        _dev: "E-mail nie wysłany — brak klucza RESEND_API_KEY",
      });
    }

    // Wysyłka przez Resend
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const subjectLabel = SUBJECT_LABELS[data.subject] || data.subject;

    const { error } = await resend.emails.send({
      from: "BNT Formularz <onboarding@resend.dev>",
      to: "kontakt@bntbudownictwo.pl",
      replyTo: data.email,
      subject: `Nowe zapytanie: ${subjectLabel} — ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E3A5F; border-bottom: 2px solid #1E3A5F; padding-bottom: 8px;">
            Nowe zapytanie z formularza kontaktowego
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #52525B; width: 140px; vertical-align: top;">Imię i nazwisko</td>
              <td style="padding: 8px 12px;">${data.name}</td>
            </tr>
            <tr style="background: #F4F4F5;">
              <td style="padding: 8px 12px; font-weight: 600; color: #52525B; vertical-align: top;">Telefon</td>
              <td style="padding: 8px 12px;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #52525B; vertical-align: top;">E-mail</td>
              <td style="padding: 8px 12px;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr style="background: #F4F4F5;">
              <td style="padding: 8px 12px; font-weight: 600; color: #52525B; vertical-align: top;">Temat</td>
              <td style="padding: 8px 12px;">${subjectLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #52525B; vertical-align: top;">Wiadomość</td>
              <td style="padding: 8px 12px; white-space: pre-wrap;">${data.message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Wiadomość wysłana z formularza na stronie bntbudownictwo.pl
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[KONTAKT] Błąd Resend:", error);
      return NextResponse.json(
        { error: { message: "Nie udało się wysłać wiadomości. Spróbuj ponownie później lub zadzwoń.", code: "SEND_ERROR" } },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[KONTAKT] Nieoczekiwany błąd:", err);
    return NextResponse.json(
      { error: { message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później lub zadzwoń bezpośrednio.", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
