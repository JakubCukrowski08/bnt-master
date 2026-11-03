import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const FacebookIcon = ({ className = "" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>Facebook</title>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.125 0-2.517.236-2.517 1.443v2.53h3.692c-.104 1.848-.314 3.667-.314 3.667h-3.378v7.98H9.101Z"/>
  </svg>
);

const LinkedinIcon = ({ className = "" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className = "" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>Instagram</title>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.873 5.873 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126 5.86 5.86 0 0 0-2.126-1.384c-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.359 1.058.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.402-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white/80 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Kolumna 1: O firmie i Social Media */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6 lg:pr-8">
            <Link href="/" className="inline-block text-h3-desktop font-heading font-bold text-white mb-2">
              BNT<span className="text-brand-primary">.</span>
            </Link>
            <p className="text-body-mobile text-white/60 mb-6 max-w-sm text-pretty">
              Generalny wykonawca inwestycji budowlanych. Solidność i terminowość na każdym etapie.
            </p>
            <div className="pt-2 text-small-mobile text-white/50 mb-6 font-mono">
              NIP: 913-128-29-95
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kolumna 2: Dane kontaktowe */}
          <div className="md:col-span-6 lg:col-span-4 lg:pl-8">
            <h3 className="text-h4-desktop font-heading font-semibold text-white mb-6">Dane kontaktowe</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-brand-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-body-mobile">
                  ul. Budowlana 12<br />
                  00-000 Warszawa
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-primary flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+48000000000" className="text-body-mobile hover:text-white transition-colors">
                  +48 000 000 000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-brand-primary flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:biuro@bntbudownictwo.pl" className="text-body-mobile hover:text-white transition-colors">
                  biuro@bntbudownictwo.pl
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-brand-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-body-mobile text-white/60">
                  Pon - Pt: 8:00 - 16:00
                </span>
              </li>
            </ul>
          </div>

          {/* Kolumna 3: Nawigacja */}
          <div className="md:col-span-3 lg:col-span-2 lg:pl-8">
            <h3 className="text-h4-desktop font-heading font-semibold text-white mb-6">Nawigacja</h3>
            <ul className="space-y-3">
              {[
                { label: "Usługi", href: "/uslugi" },
                { label: "Realizacje", href: "/realizacje" },
                { label: "Referencje", href: "/referencje" },
                { label: "O nas", href: "/o-nas" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-body-mobile hover:text-brand-primary transition-colors duration-150 ease-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 4: Informacje */}
          <div className="md:col-span-3 lg:col-span-2 lg:pl-4">
            <h3 className="text-h4-desktop font-heading font-semibold text-white mb-6">Informacje</h3>
            <ul className="space-y-3">
              {[
                { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
                { label: "Regulamin", href: "/regulamin" },
                { label: "Blog poradnikowy", href: "/blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-body-mobile text-white/50 hover:text-white transition-colors duration-150 ease-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small-mobile text-white/50 text-center md:text-left">
            &copy; {currentYear} BNT Budownictwo. Wszelkie prawa zastrzeżone.
          </p>
          <div className="text-small-mobile text-white/40">
            Realizacja: <a href="https://intecion.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Intecion Group Sp. z o.o.</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
