/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to update the website.
 *
 *  Everything a site administrator is likely to change lives here:
 *  contact details, visiting hours, services, doctor profiles and
 *  image credits. Components read from this file; no layout code needs to be
 *  touched to update text or photographs.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Sri Ramanasramam Dispensary",
  shortName: "Ramanasramam Dispensary",
  operator: "Sri Ramanasramam",
  tagline: "Serving with compassion. Caring without distinction.",
  description:
    "Sri Ramanasramam Dispensary in Tiruvannamalai provides free medical consultations, treatment and medicines to ashram staff, devotees, residents of Ramana Nagar and the surrounding community.",
  /** Set NEXT_PUBLIC_SITE_URL in production so Open Graph links resolve correctly. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
};

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our History", href: "/history" },
  { label: "Medical Services", href: "/#services" },
  { label: "Our Doctors", href: "/#doctors" },
  { label: "Health Atlas", href: "/health-atlas" },
  { label: "Visit Us", href: "/#visit" },
  { label: "Contact", href: "/contact" },
] as const;

/* ── Contacts (shown on /contact) ─────────────────────────────────────────── */

export const contacts: {
  name: string;
  role: string;
  email: string;
  note: string;
}[] = [
  {
    name: "Dr Aruna Ramanan",
    role: "Managing Director, Sri Ramanasramam Dispensary",
    email: "rsankaran2000@gmail.com",
    note: "For questions about the dispensary and its medical services.",
  },
  {
    name: "President, Sri Ramanasramam",
    role: "Office of the President",
    email: "posrm@gururamana.org",
    note: "For matters concerning Sri Ramanasramam and its dispensary.",
  },
  {
    name: "Sri Ramanasramam Archives",
    role: "Archives",
    email: "archives@gururamana.org",
    note: "For archival and historical enquiries.",
  },
];

export const address = {
  name: "Sri Ramanasramam Dispensary",
  lines: [
    "Sri Ramanasramam,",
    "Chengam Road, NH 66,",
    "Thamarai Nagar,",
    "Tiruvannamalai,",
    "Tamil Nadu – 606603.",
  ],
  street: "Sri Ramanasramam, Chengam Road, NH 66, Thamarai Nagar",
  locality: "Tiruvannamalai",
  region: "Tamil Nadu",
  postalCode: "606603",
  country: "IN",
  mapsQuery:
    "Sri Ramanasramam, Chengam Road, Tiruvannamalai, Tamil Nadu 606603",
};

export const mapsLinks = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.mapsQuery)}`,
  view: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.mapsQuery)}`,
  embed: `https://www.google.com/maps?q=${encodeURIComponent(address.mapsQuery)}&output=embed`,
};

export const visitingHours = {
  time: "8:00 AM – 11:00 AM",
  rows: [
    { day: "Monday – Saturday", value: "8:00 AM – 11:00 AM" },
    { day: "Sunday", value: "Closed" },
  ],
  notice:
    "Timings may be subject to change. Please confirm with the Ashram office before travelling from afar.",
  /** schema.org openingHours format */
  schema: "Mo-Sa 08:00-11:00",
};

/* ── Medical services ─────────────────────────────────────────────────────── */

export type ServiceIcon =
  | "consultation"
  | "treatment"
  | "medicines"
  | "laboratory"
  | "biochemistry"
  | "electrolytes"
  | "cardiology"
  | "dentistry"
  | "physiotherapy"
  | "pediatrics";

export const services: {
  title: string;
  description: string;
  icon: ServiceIcon;
}[] = [
  {
    title: "General Medicine",
    description:
      "Consultation, diagnosis and treatment for everyday health concerns.",
    icon: "consultation",
  },
  {
    title: "Pediatrics",
    description: "Medical care for infants, children and adolescents.",
    icon: "pediatrics",
  },
  {
    title: "Dentistry",
    description: "Dental examination and treatment for teeth and gums.",
    icon: "dentistry",
  },
  {
    title: "Physiotherapy",
    description:
      "Therapy to restore movement, strength and function after illness or injury.",
    icon: "physiotherapy",
  },
  {
    title: "Biochemistry",
    description:
      "Laboratory testing of blood and body fluids to support diagnosis.",
    icon: "biochemistry",
  },
];

/* ── Doctors ──────────────────────────────────────────────────────────────────
 *  Doctors are shown without photographs.
 *  To update a doctor, edit `designation` and `qualifications`; lists may be left empty.
 *  A value of `null` renders a clearly labelled placeholder on the site.
 * ─────────────────────────────────────────────────────────────────────────── */

export type Department =
  | "general"
  | "pediatrics"
  | "internal"
  | "psychiatry"
  | "dentistry"
  | "physiotherapy";

/** Headings in Our Doctors, in this order: specialists first (A–Z), then
 *  general medicine, dentistry and physiotherapy (named to match Medical Services) */
export const departments: { id: Department; title: string }[] = [
  { id: "internal", title: "Internal Medicine" },
  { id: "pediatrics", title: "Pediatrics" },
  { id: "psychiatry", title: "Psychiatry" },
  { id: "general", title: "General Medicine" },
  { id: "dentistry", title: "Dentistry" },
  { id: "physiotherapy", title: "Physiotherapy" },
];

export type Doctor = {
  name: string;
  /** The heading this doctor is listed under */
  department: Department;
  designation: string | null;
  qualifications: string[];
  specialisations: string[];
};

export const doctors: Doctor[] = [
  {
    name: "Dr Ravikumar Chodavarapu",
    department: "pediatrics",
    designation: "MBBS · DCH · DNB (Pediatrics)",
    qualifications: [
      "MBBS",
      "DCH (Diploma in Child Health)",
      "DNB (Pediatrics)",
    ],
    specialisations: ["Pediatrics"],
  },
  {
    name: "Dr Ramkumar T. Sankaran",
    department: "internal",
    designation: "MBBS · MD · DNB (Nephrology)",
    qualifications: [
      "MBBS",
      "MD (Internal Medicine)",
      "DNB (Nephrology)",
    ],
    specialisations: ["Nephrology", "Internal Medicine"],
  },
  {
    name: "Dr Aruna Ramanan",
    department: "pediatrics",
    designation: "MBBS · DCH · DNB (Pediatrics)",
    qualifications: [
      "MBBS",
      "DCH (Diploma in Child Health)",
      "DNB (Pediatrics)",
    ],
    specialisations: ["Pediatrics"],
  },
  {
    name: "Dr Anand (Venkat S. Ramanan)",
    department: "internal",
    designation: "MBBS · MD (Internal Medicine)",
    qualifications: [
      "MBBS",
      "MD (Internal Medicine)",
    ],
    specialisations: ["Internal Medicine"],
  },
  {
    name: "Dr Nitya Ramachandran",
    department: "pediatrics",
    designation: "MBBS · MD (Pediatrics) · DCH",
    qualifications: [
      "MBBS",
      "MD (Pediatrics)",
      "DCH (Diploma in Child Health)",
    ],
    specialisations: ["Pediatrics"],
  },
  {
    name: "Dr Seetha",
    department: "psychiatry",
    designation: "Consultant Psychiatrist · MBBS · DPM · DNB",
    qualifications: [
      "MBBS",
      "DPM (Diploma in Psychological Medicine)",
      "DNB",
    ],
    specialisations: ["Psychiatry"],
  },
  {
    name: "Dr Sangeetha S",
    department: "general",
    designation: "General Physician · MBBS",
    qualifications: ["MBBS"],
    specialisations: [],
  },
  {
    name: "Dr V Poun Kumar",
    department: "general",
    designation: "General Physician · MBBS",
    qualifications: ["MBBS"],
    specialisations: [],
  },
  {
    name: "Dr Jegan",
    department: "general",
    designation: "General Physician · MBBS",
    qualifications: ["MBBS"],
    specialisations: [],
  },
  {
    name: "Dr Abhishek Kaushik",
    department: "dentistry",
    designation: "Dental Surgeon · BDS",
    qualifications: ["BDS (Bachelor of Dental Surgery)"],
    specialisations: [],
  },
  {
    name: "Dr Om Sashwath Kaushik",
    department: "dentistry",
    designation: "Dental Surgeon · BDS",
    qualifications: ["BDS (Bachelor of Dental Surgery)"],
    specialisations: [],
  },
  {
    name: "Dr M Gandhi",
    department: "physiotherapy",
    designation: "Physiotherapist · BPT",
    qualifications: ["BPT (Bachelor of Physiotherapy)"],
    specialisations: [],
  },
];

/* ── Photography ──────────────────────────────────────────────────────────────
 *  Authentic photographs from Wikimedia Commons, used under their licences.
 *  Attribution is shown in the footer. Replace with the Ashram's own
 *  photography when available and update the credits accordingly.
 * ─────────────────────────────────────────────────────────────────────────── */

/* ── History ──────────────────────────────────────────────────────────────────
 *  Shown on the /history page. Based on the account
 *  supplied by the Ashram, drawn from Sri Ramanasramam's own publications.
 * ─────────────────────────────────────────────────────────────────────────── */

export type HistoryPhoto = "doctor" | "oldDispensary" | "shrine" | "dispensary";

export const history = {
  photos: {
    doctor: {
      src: "/images/history/dr-krishnamurthi-iyer.jpg",
      width: 636,
      height: 916,
      alt: "Portrait of Dr M. R. Krishnamurthi Iyer",
      caption: "Dr M. R. Krishnamurthi Iyer",
    },
    oldDispensary: {
      src: "/images/history/old-dispensary.jpg",
      width: 1400,
      height: 1867,
      alt: "Arched pink gateway marked \u201cSri Ramanasramam\u201d, with \u201cவைத்தியசாலை\u201d (dispensary) in Tamil, opening onto steps up to the old dispensary building",
      caption: "Gateway to the old dispensary (வைத்தியசாலை), Sri Ramanasramam",
    },
    shrine: {
      src: "/images/history/samadhi-shrine.jpg",
      width: 900,
      height: 1200,
      alt: "The shrine over Bhagavan Sri Ramana Maharshi's samadhi at Sri Ramanasramam, decorated with flower garlands",
      caption: "Bhagavan's samadhi shrine, Sri Ramanasramam",
    },
    dispensary: {
      src: "/images/dispensary-building-v3.jpg",
      width: 964,
      height: 1238,
      alt: "The Sri Ramanasramam Dispensary building, with its name in Tamil and English on the front wall above the gate",
      caption: "Sri Ramanasramam Dispensary, Tiruvannamalai",
    },
  } satisfies Record<HistoryPhoto, { src: string; width: number; height: number; alt: string; caption: string }>,
  intro:
    "Sri Ramanasramam Dispensary has a long history of compassionate medical service, rooted in the teachings of Bhagavan Sri Ramana Maharshi. What began as a modest medical service for the Ashram's devotees gradually grew into a free healthcare facility serving the surrounding community.",
  milestones: [
    {
      date: "Late 1920s",
      photo: "doctor",
      title: "The first doctor",
      text: "Medical services began at Sri Ramanasramam through the voluntary service of Dr M. R. Krishnamurthi Iyer, the first doctor associated with the Ashram, who offered medical attention to devotees and residents.",
    },
    {
      date: "1933",
      photo: "doctor",
      title: "The \u201cSunday Doctor\u201d",
      text: "Dr Krishnamurthi Iyer was appointed to the Tiruvannamalai hospital and settled in the town, allowing him to visit the Ashram regularly. His Sunday visits became so well known that devotees affectionately called him the \u201cSunday Doctor\u201d.",
    },
    {
      date: "1942",
      photo: "oldDispensary",
      title: "The old dispensary",
      text: "As the Ashram community grew, procedures that had been carried out in makeshift facilities moved to a dedicated dispensary building — one of the Ashram's earliest permanent structures. It was inaugurated in 1942; some historical accounts give the year as 1943.",
    },
    {
      date: "March 1949",
      photo: "oldDispensary",
      title: "A place in Bhagavan's life",
      text: "Bhagavan underwent surgery at the dispensary, performed by an eminent medical team from Chennai. The dispensary became closely associated with the final years of Bhagavan's physical life.",
    },
    {
      date: "After 1950",
      photo: "shrine",
      title: "Opening to the public",
      text: "Following Bhagavan's Mahasamadhi in 1950, the dispensary continued under the guidance of Dr Krishnamurthi Iyer. Over time its services extended beyond the Ashram's devotees to members of the general public.",
    },
    {
      date: "16 April 2010 – Present",
      photo: "dispensary",
      title: "Korangu Thottam",
      text: "A new dispensary was inaugurated at Korangu Thottam, improving access to care for elderly devotees and for residents who found it difficult to travel to the government hospital in town. It brought improved diagnostic and physiotherapy equipment and expanded services:",
      list: [
        "Free outpatient medical consultations",
        "Laboratory investigations, including blood and biochemical tests",
        "Physiotherapy",
        "Care for devotees, local residents and people from surrounding villages",
        "Qualified doctors, nurses, pharmacists, laboratory technicians and other staff",
      ],
    },
  ] as {
    date: string;
    title: string;
    text: string;
    list?: string[];
    /** Which of `history.photos` is shown beside this milestone */
    photo: HistoryPhoto;
  }[],
  closing:
    "From its humble beginnings in the late 1920s, the dispensary has remained committed to the principle that healthcare is an expression of compassion and service — reflecting Bhagavan Sri Ramana Maharshi's teachings of serving humanity with humility, care and selflessness.",
};

export const images = {
  hero: {
    src: "/images/ramanasramam-courtyard-arunachala.jpg",
    alt: "A shaded walkway inside Sri Ramanasramam with Arunachala hill rising beyond the trees",
    width: 1920,
    height: 1440,
  },
  about: {
    src: "/images/dispensary-building-v3.jpg",
    alt: "The Sri Ramanasramam Dispensary building, with its name in Tamil and English on the front wall above the gate",
    width: 964,
    height: 1238,
  },
  service: {
    src: "/images/arunachala-view-tiruvannamalai.jpg",
    alt: "View from the slopes of Arunachala over the town of Tiruvannamalai",
    width: 1920,
    height: 1280,
  },
};

export const imageCredits = [
  {
    subject: "Sri Ramanasramam, inside the Ashram",
    author: "Gowtham Sampath",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Shri_Ramanasramam_Inside.jpg",
  },
  {
    subject: "Arunachala Hill slopes, Tiruvannamalai",
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Tiruvannamalai,_Arunachala_Hill,_Annamalai_Hill,_Slopes,_India.jpg",
  },
];
