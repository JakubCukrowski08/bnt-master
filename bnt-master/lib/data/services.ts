export interface ServiceSection {
  title: string;
  items: string[];
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  shortDesc: string; 
  lead: string;      
  
  // Nowa struktura podstrony szczegółowej:
  introSection?: {
    heading: string;
    paragraphs: string[];
    imagePlaceholder?: string; 
  };
  calloutSection?: {
    heading: string;
    content: string;
    tags: string[]; 
  };
  gridSection?: {
    heading: string;
    content: string;
    items: string[]; 
  };
  darkSection?: {
    heading: string;
    content: string;
    imagePlaceholder?: string;
  };

  // Stare pola (zostawiamy dla kompatybilności wstecznej)
  sections?: {
    first: {
      title: string; 
      items: string[];
    };
    second: {
      title: string; 
      content: string;
    };
  };
}

export const services: ServiceData[] = [
  {
    id: "01",
    slug: "uslugi-inzynieryjne-budowlane",
    title: "Usługi Inżynieryjno-Budowlane",
    shortDesc: "Kompleksowe wsparcie inżynieryjne na każdym etapie inwestycji — od analizy dokumentacji po odbiór końcowy.",
    lead: "Kompleksowe wsparcie inżynieryjne w zakresie budownictwa drogowego, mostowego i konstrukcyjnego — od dokumentacji technicznej po nadzór nad realizacją, prowadzone przez zespół z pełnymi uprawnieniami budowlanymi.",
    introSection: {
      heading: "Pełne zaplecze inżynieryjne dla Twojej inwestycji",
      paragraphs: [
        "Nasz zespół dysponuje uprawnieniami budowlanymi w specjalnościach drogowej, mostowej oraz konstrukcyjno-budowlanej, co pozwala nam kompleksowo obsłużyć inwestycję od etapu koncepcji po oddanie obiektu do użytku. Zanim podejmiecie Państwo decyzję o powierzeniu nadzoru nad inwestycją, warto zweryfikować zakres posiadanych uprawnień — to one determinują, jakie prace dany specjalista może legalnie prowadzić.",
        "Usługi inżynieryjno-budowlane obejmują przygotowanie i weryfikację dokumentacji technicznej, wsparcie w uzyskaniu niezbędnych pozwoleń, koordynację prac na placu budowy oraz bieżący nadzór nad ich prawidłowym przebiegiem. Dzięki temu inwestycja realizowana jest zgodnie z harmonogramem, budżetem i najwyższymi standardami jakości — a inwestor zyskuje realną ochronę swoich interesów na każdym etapie."
      ],
      imagePlaceholder: "placeholder_inżynier_z_planami"
    },
    calloutSection: {
      heading: "Dlaczego uprawnienia mają znaczenie",
      content: "Prac inżynieryjnych w branży drogowej i mostowej nie może prowadzić dowolna osoba — wymagane są udokumentowane kwalifikacje zawodowe: ukończone studia budowlane, odpowiednia praktyka zawodowa na budowie oraz zdany egzamin państwowy przed Polską Izbą Inżynierów Budownictwa. Przed powierzeniem nadzoru warto zweryfikować referencje i zakres posiadanych uprawnień potencjalnego partnera — to podstawowe zabezpieczenie interesów inwestora.",
      tags: ["UPRAWNIENIA PIIB", "PRAKTYKA ZAWODOWA", "WERYFIKOWALNE REFERENCJE"]
    },
    gridSection: {
      heading: "Nadzór nad obiektami inżynierskimi",
      content: "Posiadane uprawnienia mostowe obejmują kierowanie i nadzór inwestorski nad budową obiektów inżynierskich w pasie drogowym i kolejowym — od dużych konstrukcji po mniejsze elementy infrastruktury.",
      items: ["Mosty", "Wiadukty", "Przepusty", "Ściany oporowe", "Tunele liniowe", "Przejścia dla pieszych"]
    },
    darkSection: {
      heading: "Kompetencje konstrukcyjno-budowlane",
      content: "Posiadane uprawnienia konstrukcyjno-budowlane obejmują kierowanie wytwarzaniem elementów konstrukcyjnych, nadzór i kontrolę techniczną ich produkcji oraz nadzór inwestorski nad pracami konstrukcyjnymi. Dbamy o to, aby każdy etap — od produkcji elementów po ich montaż — przebiegał zgodnie z projektem, obowiązującymi normami i przepisami prawa budowlanego.",
      imagePlaceholder: "placeholder_konstrukcja_stalowa"
    },
    sections: {
      first: {
        title: "Zakres usług",
        items: [
          "Opracowywanie i weryfikacja dokumentacji technicznej oraz kosztorysów",
          "Doradztwo techniczne na etapie planowania inwestycji",
          "Ekspertyzy stanu technicznego obiektów i elementów konstrukcyjnych",
          "Wsparcie w doborze rozwiązań technologicznych i materiałowych",
          "Koordynacja między projektantem, wykonawcą a inwestorem"
        ]
      },
      second: {
        title: "Dla kogo",
        content: "Usługa skierowana zarówno do inwestorów indywidualnych planujących budowę domu, jak i firm oraz instytucji realizujących inwestycje komercyjne, przemysłowe i infrastrukturalne na terenie Wrocławia i całego Dolnego Śląska."
      }
    }
  },
  {
    id: "02",
    slug: "nadzor-inwestorski",
    title: "Nadzór Inwestorski",
    shortDesc: "Ochrona interesów inwestora, weryfikacja jakości, harmonogramów i zgodności robót z projektem.",
    lead: "Reprezentujemy interesy inwestora na każdym etapie budowy — kontrolujemy zgodność prac z dokumentacją, harmonogramem i budżetem, minimalizując ryzyko błędów i nieprawidłowości.",
    sections: {
      first: {
        title: "Obowiązki inspektora nadzoru",
        items: [
          "Kontrola jakości i zgodności wykonywanych robót z projektem",
          "Weryfikacja harmonogramu i rozliczeń finansowych budowy",
          "Udział w naradach technicznych, odbiorach częściowych i końcowych",
          "Sprawdzanie kosztorysów wykonawczych i ofertowych",
          "Prowadzenie korespondencji i koordynacja z wykonawcami"
        ]
      },
      second: {
        title: "Dlaczego warto",
        content: "Nadzór inwestorski to formalne zabezpieczenie interesów inwestora zgodnie z Prawem budowlanym (art. 25-26 ustawy z 7 lipca 1994 r.) — niezależna kontrola procesu budowy zmniejsza ryzyko opóźnień, przekroczenia budżetu i wad wykonawczych, szczególnie przy większych lub wieloetapowych inwestycjach."
      }
    }
  },
  {
    id: "03",
    slug: "kierowanie-nadzorowanie-budowy",
    title: "Kierowanie i Nadzorowanie Budowy",
    shortDesc: "Kierownictwo nad robótami, koordynacja podwykonawców, BHP i pełna odpowiedzialność prawna.",
    lead: "Bezpośrednie kierownictwo nad przebiegiem robót budowlanych — koordynacja podwykonawców, kontrola bezpieczeństwa i odpowiedzialność za zgodność realizacji z projektem i przepisami prawa budowlanego.",
    sections: {
      first: {
        title: "Zakres odpowiedzialności",
        items: [
          "Organizacja i koordynacja pracy na placu budowy",
          "Nadzór nad przestrzeganiem przepisów BHP",
          "Prowadzenie dziennika budowy i dokumentacji wykonawczej",
          "Odbiory robót zanikających i ulegających zakryciu",
          "Bieżąca komunikacja z inwestorem o postępach i ewentualnych odstępstwach"
        ]
      },
      second: {
        title: "Dla jakich inwestycji",
        content: "Usługa obejmuje zarówno budowy jednorodzinne, jak i większe realizacje komercyjne oraz przemysłowe, gdzie wymagana jest stała obecność i odpowiedzialność kierownika budowy z odpowiednimi uprawnieniami."
      }
    }
  },
  {
    id: "04",
    slug: "inwestor-zastepczy",
    title: "Inwestor Zastępczy",
    shortDesc: "Pełne zarządzanie inwestycją, organizacja przetargów i budżetu w imieniu inwestora.",
    lead: "Pełne zastępstwo inwestycyjne — przejmujemy organizacyjną i formalną odpowiedzialność za przebieg inwestycji, żeby inwestor mógł skupić się na swojej działalności, mając pewność profesjonalnego prowadzenia projektu.",
    sections: {
      first: {
        title: "Co obejmuje zastępstwo inwestycyjne",
        items: [
          "Reprezentowanie inwestora przed urzędami i organami administracji budowlanej",
          "Organizacja przetargów i wybór wykonawców",
          "Zarządzanie budżetem i harmonogramem całej inwestycji",
          "Koordynacja wszystkich uczestników procesu budowlanego (projektant, wykonawca, dostawcy)",
          "Nadzór nad odbiorem końcowym i przekazaniem obiektu do użytkowania"
        ]
      },
      second: {
        title: "Kiedy warto skorzystać",
        content: "Rozwiązanie szczególnie przydatne dla inwestorów bez własnego zaplecza technicznego lub czasu na bieżące zarządzanie budową — pełne przejęcie odpowiedzialności organizacyjnej pozwala ograniczyć ryzyko i zaoszczędzić czas."
      }
    }
  },
  {
    id: "05",
    slug: "nadzory-budowlane",
    title: "Nadzory Budowlane",
    shortDesc: "Niezależna kontrola techniczna i ekspertyzy zgodności robót z projektem i przepisami.",
    lead: "Niezależna kontrola techniczna realizowanych inwestycji — sprawdzamy zgodność wykonania z projektem, obowiązującymi normami i przepisami prawa budowlanego, na każdym etapie prac.",
    sections: {
      first: {
        title: "Zakres nadzoru",
        items: [
          "Kontrola zgodności realizacji z projektem budowlanym i pozwoleniem na budowę",
          "Weryfikacja jakości materiałów i wykonywanych robót",
          "Nadzór nad dużymi, wieloetapowymi oraz publicznymi inwestycjami",
          "Identyfikacja i eliminacja zagrożeń na placu budowy",
          "Sporządzanie ekspertyz i opinii technicznych w razie wątpliwości"
        ]
      },
      second: {
        title: "Obszar działania",
        content: "Świadczymy usługi nadzoru budowlanego na terenie Wrocławia oraz całego województwa dolnośląskiego, obejmując zarówno inwestycje prywatne, jak i publiczne wymagające szczególnych standardów kontroli."
      }
    }
  }
];
