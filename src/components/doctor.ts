import type { SocialLink } from "@/components/SocialLinks";

// Doctor and team details, as supplied by Trú Aesthetics.
// `story` holds the longer write-up for each doctor's profile page (/doctors/[slug]), one
// paragraph per entry. Add the clinic's text there; the section is hidden while it is empty.
export const DOCTOR = {
  slug: "dr-kirash-parthipady",
  name: "Dr. Kirash Parthipady",
  title: "Facial Plastic and Cosmetic Surgeon",
  qualifications: "MDS (OMFS) · AFCS · Maxillofacial Surgeon",
  intro:
    "Dr. Kirash brings vast experience to our team, including a fellowship in Advanced Cosmetic Surgery from Mumbai and his status as a resident member of the American Association of Cosmetic Surgery (AACS). He specializes in cosmetic facial procedures, such as facelifts, rhinoplasty, and facial rejuvenation, and is committed to providing his patients with natural-looking results that enhance their unique features.",
  badge: { value: "AACS", label: "Resident Member" },
  credentials: [
    { value: "Fellowship", label: "Advanced Cosmetic Surgery, Mumbai" },
    { value: "MDS · AFCS", label: "Oral & Maxillofacial Surgery" },
  ],
  points: [
    "MDS (OMFS), AFCS, Maxillofacial Surgeon",
    "Fellowship in Advanced Cosmetic Surgery, Mumbai",
    "Resident Member of the American Association of Cosmetic Surgery (AACS)",
    "Facial Plastic and Cosmetic Surgeon",
  ],
  story: [] as string[],
  social: [
    { network: "facebook", url: "https://www.facebook.com/kirash.parthipady/" },
    {
      network: "instagram",
      url: "https://www.instagram.com/kirashparthipady/",
    },
  ] as SocialLink[],
};

export const TEAM = [
  {
    slug: "prof-dr-mohan-thomas",
    name: "Prof. Dr. Mohan Thomas",
    degrees: "M.D (USA) · FACS (USA)",
    role: "Cosmetic & Facial Plastic Surgeon",
    intro:
      "Prof. Dr. Mohan Thomas is an American-trained, triple-boarded cosmetic surgeon and facial plastic surgeon, and a Fellow of the American College of Surgeons. A former Visiting Scholar at Mount Sinai Medical Center, New York, he is a Clinical Professor of Surgery at DY Patil University and a consultant at Breach Candy Hospital, Mumbai. Trú Aesthetics works in association with his Mumbai practice.",
    credentials: [
      { value: "Triple-boarded", label: "Cosmetic & facial surgery" },
      { value: "M.D · FACS", label: "Trained in the USA" },
    ],
    points: [
      "Visiting Scholar, Mount Sinai Medical Center, New York",
      "Clinical Professor of Surgery, DY Patil University, Mumbai",
      "Consultant, Breach Candy Hospital, Mumbai",
    ],
    story: [] as string[],
    social: [
      {
        network: "instagram",
        url: "https://www.instagram.com/dr.mohan_thomas/",
      },
      {
        network: "website",
        url: "https://www.drmohanthomasaesthetics.com/about-doctor",
      },
    ] as SocialLink[],
  },
  {
    slug: "dr-sana-aboobaker",
    name: "Dr. Sana Aboobaker",
    degrees: "MBBS · MS (ENT)",
    role: "Otorhinolaryngologist (ENT Surgeon)",
    intro:
      "Dr. Sana Aboobaker is an otorhinolaryngologist, a specialist in conditions of the ear, nose and throat. She holds an MBBS and an MS in ENT, and completed a fellowship in Cochlear Implant Surgery in Mumbai. Her specialist training adds valuable depth to our team, and she is committed to careful, thorough care that puts each patient's comfort, safety and wellbeing first.",
    credentials: [
      { value: "Fellowship", label: "Cochlear Implant Surgery, Mumbai" },
      { value: "MBBS · MS", label: "Otorhinolaryngology (ENT)" },
    ],
    points: [
      "MBBS, MS (ENT), Otorhinolaryngologist",
      "Fellowship in Cochlear Implant Surgery, Mumbai",
    ],
    story: [] as string[],
    social: [] as SocialLink[],
  },
];

/** Every doctor in one shape, for the profile pages. */
export const DOCTORS = [
  {
    slug: DOCTOR.slug,
    name: DOCTOR.name,
    degrees: DOCTOR.qualifications,
    role: DOCTOR.title,
    intro: DOCTOR.intro,
    points: DOCTOR.points,
    story: DOCTOR.story,
    social: DOCTOR.social,
  },
  ...TEAM,
];

export const doctorHref = (slug: string) => `/doctors/${slug}`;

export const initials = (name: string) =>
  name
    .replace(/^(Prof\. )?Dr\. /, "")
    .split(" ")
    .map((word) => word[0])
    .join("");
