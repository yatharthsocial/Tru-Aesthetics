// Treatments shown on the model. Names and descriptions follow the clinic's own copy (see clinic.ts).
export type Fix =
  "hairline" | "eyelids" | "brows" | "ears" | "lips" | "upperlip" | "skin";

export const SERVICES: {
  name: string;
  category: "Surgical" | "Non-surgical";
  description: string;
  /**
   * The areas the markers point at on src/model-female.webp (fractions of the image), each with
   * a short tooltip. Tooltip wording is a draft for the clinic to review.
   */
  points: { x: number; y: number; label?: string; note?: string }[];
  /** The concern this treatment corrects on the model; she shows it until the treatment is reached. */
  fix: Fix;
  featured?: boolean;
}[] = [
  {
    name: "Hair Transplant",
    category: "Surgical",
    description:
      "Unlock the potential for a fuller, natural-looking head of hair with our advanced hair transplant techniques.",
    points: [
      {
        x: 0.504,
        y: 0.381,
        label: "Hairline",
        note: "Grafts placed one by one, following your natural growth direction.",
      },
    ],
    fix: "hairline",
    featured: true,
  },
  {
    name: "Eyelid Surgery",
    category: "Surgical",
    fix: "eyelids",
    description:
      "Our surgeons address excess skin, puffiness, and drooping, revealing eyes that radiate youth and vitality.",
    points: [
      {
        x: 0.592,
        y: 0.516,
        label: "Eyelids",
        note: "Excess skin gently removed to open up tired-looking eyes.",
      },
    ],
  },
  {
    name: "Eyebrow Lift",
    category: "Surgical",
    fix: "brows",
    description:
      "Achieve a more youthful and awake look as our surgeons artfully sculpt and reposition your eyebrows.",
    points: [
      {
        x: 0.6,
        y: 0.494,
        label: "Brow line",
        note: "A heavy brow is raised for a more rested, open look.",
      },
    ],
  },
  {
    name: "Otoplasty",
    fix: "ears",
    category: "Surgical",
    description:
      "Our surgeons specialise in reshaping and repositioning ears, providing a harmonious balance to your facial features.",
    points: [
      {
        x: 0.712,
        y: 0.592,
        label: "Ears",
        note: "Reshaped or set back to sit closer to the head.",
      },
    ],
  },
  {
    name: "Lip Augmentation",
    fix: "lips",
    category: "Non-surgical",
    description:
      "Dermal fillers enhance lip volume, shape, and definition, creating natural-looking results that complement your features.",
    points: [
      {
        x: 0.504,
        y: 0.69,
        label: "Lips",
        note: "Adds volume and shape while keeping movement natural.",
      },
    ],
  },
  {
    name: "Laser Hair Reduction",
    fix: "upperlip",
    category: "Non-surgical",
    description:
      "Our advanced laser technology targets hair follicles, reducing unwanted hair growth with precision and efficiency.",
    points: [
      {
        x: 0.504,
        y: 0.738,
        label: "Upper lip & chin",
        note: "Laser targets the follicle to reduce regrowth over sessions.",
      },
    ],
  },
  {
    name: "Botox & Fillers",
    category: "Non-surgical",
    description:
      "Botulinum toxins relax the muscles behind lines, while dermal fillers restore lost volume, for a refreshed and youthful look.",
    points: [
      {
        x: 0.504,
        y: 0.45,
        label: "Forehead lines",
        note: "Expression lines relaxed with botulinum toxins.",
      },
      {
        x: 0.364,
        y: 0.53,
        label: "Crow's feet",
        note: "Fine lines at the corners of the eyes smoothed.",
      },
      { x: 0.642, y: 0.53 },
      {
        x: 0.45,
        y: 0.643,
        label: "Smile lines",
        note: "Folds beside the mouth softened with dermal fillers.",
      },
      { x: 0.558, y: 0.643 },
    ],
    fix: "skin",
  },
];
