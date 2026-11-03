export interface Realizacja {
  id: string;
  slug: string;
  title: string;
  type: string;
  year: number;
  location: string;
  shortDesc: string;
  fullDesc: string;
  stats: {
    label: string;
    value: number | string;
    isNumber: boolean;
  }[];
  features: string[];
  gallery: string[];
  mainImg: string;
  featured: boolean;
}

export const realizacje: Realizacja[] = [
  {
    id: "brzozowe-zacisze-etap-1",
    slug: "brzozowe-zacisze-etap-1",
    title: "Brzozowe Zacisze — Etap I",
    type: "MIESZKANIOWE",
    year: 2013,
    location: "Wrocław, ul. Maślicka",
    shortDesc: "Pierwszy etap dużego, wieloletniego założenia osiedlowego na wrocławskich Maślicach.",
    fullDesc: "Pierwszy etap dużego, wieloletniego założenia osiedlowego na wrocławskich Maślicach. 76 mieszkań w układach 1-, 2- i 3-pokojowych, zaprojektowanych z myślą o komforcie mieszkańców. Bezpośrednie sąsiedztwo czterech kompleksów leśnych (Pilczycki, Osobowicki, Rędziński, Mokrzański) zapewnia dostęp do terenów rekreacyjnych — tras rowerowych i miejsc na rodzinne wypady na świeże powietrze. Projekt zrealizowany przy nadzorze inwestorskim naszego zespołu, co zagwarantowało terminowość i dbałość o detale wykonawcze.",
    stats: [
      { label: "Mieszkań", value: 76, isNumber: true },
      { label: "Rok ukończenia", value: 2013, isNumber: true },
      { label: "Układ lokali", value: "1-3 pokoje", isNumber: false }
    ],
    features: ["76 MIESZKAŃ", "BLISKOŚĆ TERENÓW ZIELONYCH", "TRASY ROWEROWE", "1-3 POKOJE"],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200"
    ],
    mainImg: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    featured: true
  },
  {
    id: "brzozowe-zacisze-etap-2",
    slug: "brzozowe-zacisze-etap-2",
    title: "Brzozowe Zacisze — Etap II",
    type: "MIESZKANIOWE",
    year: 2015,
    location: "Wrocław, ul. Maślicka",
    shortDesc: "Kontynuacja osiedla z ok. 50 lokalami, wyróżniająca się starannie zaaranżowaną zielenią.",
    fullDesc: "Kontynuacja osiedla z ok. 50 lokalami, wyróżniająca się charakterystyczną stylistyką budynków i starannie zaaranżowaną zielenią wspólną. Mieszkania z ogrodami, tarasami, balkonami lub antresolami, w otoczeniu parkowo-leśnym sprzyjającym wypoczynkowi po pracy. Jako podmiot sprawujący nadzór inwestorski, dbaliśmy o zachowanie najwyższych standardów budowlanych na każdym etapie wznoszenia budynków.",
    stats: [
      { label: "Lokali", value: 50, isNumber: true },
      { label: "Rok ukończenia", value: 2015, isNumber: true },
      { label: "Przestrzeń", value: "Ogrody i tarasy", isNumber: false }
    ],
    features: ["OK. 50 LOKALI", "OGRODY I TARASY", "ANTRESOLE", "ZIELONA STREFA WSPÓLNA"],
    gallery: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200"
    ],
    mainImg: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200",
    featured: false
  },
  {
    id: "brzozowe-zacisze-etap-3",
    slug: "brzozowe-zacisze-etap-3",
    title: "Brzozowe Zacisze — Etap III",
    type: "MIESZKANIOWE",
    year: 2017,
    location: "Wrocław, ul. Maślicka",
    shortDesc: "Trzeci etap obejmujący 113 mieszkań rodzinnych w układach jedno- i dwupoziomowych.",
    fullDesc: "Trzeci etap obejmujący 113 mieszkań rodzinnych w układach jedno- i dwupoziomowych. Elastyczny rozkład dopasowany zarówno do singli, młodych par, jak i większych rodzin. Na terenie osiedla bezpieczny plac zabaw dla dzieci i siłownia plenerowa. Projekt zrealizowany przy nadzorze inwestorskim naszego zespołu, co pozwoliło na płynną koordynację prac i terminowe przekazanie kluczy inwestorowi.",
    stats: [
      { label: "Mieszkań", value: 113, isNumber: true },
      { label: "Rok ukończenia", value: 2017, isNumber: true },
      { label: "Typ kondygnacji", value: "1-2 poziomowe", isNumber: false }
    ],
    features: ["113 MIESZKAŃ", "UKŁADY DWUPOZIOMOWE", "PLAC ZABAW", "SIŁOWNIA PLENEROWA"],
    gallery: [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200"
    ],
    mainImg: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200",
    featured: true
  },
  {
    id: "brzozowe-zacisze-etap-4",
    slug: "brzozowe-zacisze-etap-4",
    title: "Brzozowe Zacisze — Etap IV",
    type: "MIESZKANIOWE",
    year: 2019,
    location: "Wrocław, ul. Maślicka",
    shortDesc: "Finałowa odsłona osiedla, zamykająca projekt zainicjowany w 2013 roku.",
    fullDesc: "Finałowa odsłona osiedla, zamykająca projekt zainicjowany w 2013 roku. 124 mieszkania w zamkniętym, monitorowanym osiedlu z podziemnym garażem, placem zabaw, siłownią plenerową i zielonymi częściami wspólnymi. Mieszkania na parterze z prywatnymi ogródkami lub tarasami, na ostatniej kondygnacji — przestronne antresole. Zespół BNT Budownictwo miał zaszczyt pełnić nadzór inwestorski nad tym kluczowym zamykającym etapem, dbając o ostateczny szlif całego kompleksu mieszkaniowego.",
    stats: [
      { label: "Mieszkań", value: 124, isNumber: true },
      { label: "Rok ukończenia", value: 2019, isNumber: true },
      { label: "Status osiedla", value: "Zamknięte", isNumber: false }
    ],
    features: ["124 MIESZKANIA", "OSIEDLE ZAMKNIĘTE", "GARAŻ PODZIEMNY", "PRYWATNE OGRÓDKI", "MONITORING"],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200"
    ],
    mainImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    featured: true
  },
  {
    id: "kepa-park",
    slug: "kepa-park",
    title: "Kępa Park",
    type: "MIESZKANIOWE",
    year: 2021,
    location: "Wrocław, Kępa Mieszczańska (ul. Dmowskiego)",
    shortDesc: "Kompleks mieszkalny w centrum Wrocławia przy Kępie Mieszczańskiej z lokalami inwestycyjnymi.",
    fullDesc: "Kompleks mieszkalny na Kępie Mieszczańskiej, w samym centrum Wrocławia, przy ulicy Dmowskiego — w bezpośrednim sąsiedztwie terenów zielonych i rzeki, ok. 15 minut spacerem od Rynku. Sześciokondygnacyjny budynek (część południowa obniżona do czterech kondygnacji) mieści 148 mieszkań w układach jedno-, dwu- i trzypokojowych, o metrażach od 28 do 77 m², w tym lokale inwestycyjne z osobnymi wejściami przeznaczone pod wynajem. Całość uzupełnia podziemny garaż wielostanowiskowy i winda z poziomu garażu. Nasz zespół sprawował profesjonalny nadzór inwestorski, kontrolując zarówno terminowość wykonania, jak i zachowanie wysokich standardów wymaganych przy inwestycjach o randze śródmiejskiej.",
    stats: [
      { label: "Mieszkań", value: 148, isNumber: true },
      { label: "Rok ukończenia", value: 2021, isNumber: true },
      { label: "Układ lokali", value: "1-3 pokoje", isNumber: false }
    ],
    features: ["GARAŻ PODZIEMNY", "LOKALIZACJA ŚRÓDMIEJSKA", "BLISKOŚĆ RZEKI", "LOKALE INWESTYCYJNE"],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200"
    ],
    mainImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200", // Różny obraz dla Kępy
    featured: true
  }
];
