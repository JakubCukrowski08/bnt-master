import React from "react";
import { Button } from "@/components/ui/Button";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-brand-bg p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-16">
        
        <header>
          <h1 className="mb-2">Button Component Preview</h1>
          <p className="text-body-medium">Koncepcja: solidność, inżynierski charakter, ostre krawędzie.</p>
        </header>

        <section className="space-y-6">
          <h2>Warianty (Rozmiar: md)</h2>
          <div className="flex flex-wrap gap-4 items-end bg-brand-surface p-6 rounded-sm border border-brand-border">
            <div className="flex flex-col gap-2">
              <small>Primary</small>
              <Button variant="primary">Wycena projektu</Button>
            </div>
            <div className="flex flex-col gap-2">
              <small>Secondary</small>
              <Button variant="secondary">Zobacz realizacje</Button>
            </div>
            <div className="flex flex-col gap-2">
              <small>Outline</small>
              <Button variant="secondary">Skontaktuj się z nami</Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>Rozmiary (Wariant: primary)</h2>
          <div className="flex flex-wrap gap-6 items-end bg-brand-surface p-6 rounded-sm border border-brand-border">
            <div className="flex flex-col gap-2">
              <small>Small (sm)</small>
              <Button size="sm">Zapisz się</Button>
            </div>
            <div className="flex flex-col gap-2">
              <small>Medium (md)</small>
              <Button size="md">Bezpłatna wycena</Button>
            </div>
            <div className="flex flex-col gap-2">
              <small>Large (lg)</small>
              <Button size="lg">Rozpocznij Inwestycję</Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>Stany i Mikrointerakcje (Primary, md)</h2>
          <div className="flex flex-wrap gap-6 items-end bg-brand-surface p-6 rounded-sm border border-brand-border">
            <div className="flex flex-col gap-2">
              <small>Default / Hover / Active</small>
              <Button>Kliknij mnie</Button>
            </div>
            <div className="flex flex-col gap-2">
              <small>Disabled</small>
              <Button disabled>Opcja niedostępna</Button>
            </div>
            <div className="flex flex-col gap-2">
              <small>Loading (isLoading)</small>
              <Button isLoading>Przetwarzanie...</Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
