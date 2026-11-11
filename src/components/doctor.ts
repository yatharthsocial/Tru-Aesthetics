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
    "MDS (OMFS), AFCS — Maxillofacial Surgeon",
    "Fellowship in Advanced Cosmetic Surgery, Mumbai",
    "Resident Member of the American Association of Cosmetic Surgery (AACS)",
    "Facial Plastic and Cosmetic Surgeon",
  ],
  story: [] as string[],
};

export const TEAM = [
  {
    slug: "prof-dr-mohan-thomas",
    name: "Prof. Dr. Mohan Thomas",
    degrees: "M.D (USA) · FACS (USA)",
    role: "American-trained, triple-boarded cosmetic surgeon and facial plastic surgeon",
    points: [
      "Visiting Scholar, Mount Sinai Medical Center, New York",
      "Clinical Professor of Surgery, DY Patil University, Mumbai",
      "Consultant, Breach Candy Hospital, Mumbai",
    ],
    story: [] as string[],
  },
  {
    slug: "dr-sana-aboobaker",
    name: "Dr. Sana Aboobaker",
    degrees: "MBBS · MS (ENT)",
    role: "Otorhinolaryngologist",
    points: ["Fellowship in Cochlear Implant Surgery, Mumbai"],
    story: [] as string[],
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
  },
  ...TEAM.map((member) => ({ ...member, intro: "" })),
];

export const doctorHref = (slug: string) => `/doctors/${slug}`;

export const initials = (name: string) =>
  name
    .replace(/^(Prof\. )?Dr\. /, "")
    .split(" ")
    .map((word) => word[0])
    .join("");
