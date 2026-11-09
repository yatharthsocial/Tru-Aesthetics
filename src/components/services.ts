// From the clinic's listing. The one-line descriptions are drafts for the clinic to review.
export const SERVICES: {
  name: string;
  category: "Surgery" | "Procedures" | "Treatment";
  description: string;
  /**
   * The areas the markers point at on src/model-female.webp (fractions of the image), each with
   * a short tooltip. Tooltip wording is a draft for the clinic to review.
   */
  points: { x: number; y: number; label?: string; note?: string }[];
  /** Shows the model without the signs of ageing she has everywhere else. */
  rejuvenates?: boolean;
  /** Fills the model's receded hairline back in while the service is hovered. */
  restoresHair?: boolean;
  featured?: boolean;
}[] = [
  {
    name: "Hair Transplant",
    category: "Surgery",
    description:
      "Your own follicles moved to thinning areas, placed at the angle and direction of your natural hair.",
    points: [{ x: 0.504, y: 0.381, label: "Hairline", note: "Grafts placed one by one, following your natural growth direction." }],
    restoresHair: true,
    featured: true,
  },
  {
    name: "Blepharoplasty",
    category: "Surgery",
    description: "Eyelid surgery that refreshes tired-looking eyes.",
    points: [{ x: 0.592, y: 0.516, label: "Eyelids", note: "Excess skin gently removed to open up tired-looking eyes." }],
  },
  {
    name: "Brow Lift",
    category: "Surgery",
    description: "Lifts and smooths the brow line for a more rested, open look.",
    points: [{ x: 0.6, y: 0.494, label: "Brow line", note: "A heavy brow is raised for a more rested, open look." }],
  },
  {
    name: "Otoplasty",
    category: "Surgery",
    description: "Reshapes or sets back prominent ears.",
    points: [{ x: 0.712, y: 0.592, label: "Ears", note: "Reshaped or set back to sit closer to the head." }],
  },
  {
    name: "Lip Augmentation",
    category: "Surgery",
    description: "Adds natural-looking volume and definition to the lips.",
    points: [{ x: 0.504, y: 0.69, label: "Lips", note: "Adds volume and shape while keeping movement natural." }],
  },
  {
    name: "Laser Hair Removal",
    category: "Procedures",
    description: "Reduces unwanted hair over a course of targeted laser sessions.",
    points: [{ x: 0.504, y: 0.738, label: "Upper lip & chin", note: "Laser targets the follicle to reduce regrowth over sessions." }],
  },
  {
    name: "Anti Aging",
    category: "Treatment",
    description: "Treatments that soften lines and bring back a fresher look.",
    points: [
      {
        x: 0.504,
        y: 0.45,
        label: "Forehead lines",
        note: "Expression lines relaxed and softened.",
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
        note: "Folds beside the mouth gently filled.",
      },
      { x: 0.558, y: 0.643 },
    ],
    rejuvenates: true,
  },
];
