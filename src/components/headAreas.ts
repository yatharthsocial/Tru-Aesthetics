export type HeadArea = {
  id: string;
  name: string;
  description: string;
  /** Marker position on src/tru-goldfinch-hd.webp, as a fraction of the image. */
  anchor: { x: number; y: number };
  /** Which side of the head its note opens on (desktop); the sides alternate. */
  side: "left" | "right";
};

// The areas a hair transplant plans for, from the front edge back to the donor area.
export const HEAD_AREAS: HeadArea[] = [
  {
    id: "hairline",
    name: "Hairline",
    description:
      "The front edge that frames the face. It is planned around your age, face shape and natural direction of growth.",
    anchor: { x: 0.5, y: 0.185 },
    side: "left",
  },
  {
    id: "temples",
    name: "Temples",
    description:
      "The corners either side of the forehead, where recession often begins. Restoring them brings balance back to the hairline.",
    anchor: { x: 0.645, y: 0.235 },
    side: "right",
  },
  {
    id: "mid-scalp",
    name: "Mid-scalp",
    description:
      "The zone behind the hairline. Density here keeps hair looking full from the front and from above.",
    anchor: { x: 0.5, y: 0.145 },
    side: "left",
  },
  {
    id: "crown",
    name: "Crown",
    description:
      "The swirl at the top and back of the head. Thinning here is hard to see yourself, and grafts must follow its circular pattern.",
    anchor: { x: 0.53, y: 0.118 },
    side: "right",
  },
  {
    id: "donor",
    name: "Donor area",
    description:
      "The back and sides of the head, where hair usually resists thinning. Follicles are taken from here and moved to thinning areas.",
    anchor: { x: 0.325, y: 0.275 },
    side: "left",
  },
];
