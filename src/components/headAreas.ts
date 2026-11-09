export type HeadArea = {
  id: string;
  name: string;
  description: string;
  /** Marker position on the portrait, as a fraction of the image. */
  anchor: { x: number; y: number; depth: number };
};

export const HEAD_AREAS: HeadArea[] = [
  {
    id: "hairline",
    name: "Hairline",
    description:
      "The front edge that frames the face. It is planned around your age, face shape and natural direction of growth.",
    anchor: { x: 0.5, y: 0.185, depth: 0.84 },
  },
  {
    id: "temples",
    name: "Temples",
    description:
      "The corners either side of the forehead, where recession often begins. Restoring them brings balance back to the hairline.",
    anchor: { x: 0.645, y: 0.235, depth: 0.78 },
  },
  {
    id: "mid-scalp",
    name: "Mid-scalp",
    description:
      "The zone behind the hairline. Density here keeps hair looking full from the front and from above.",
    anchor: { x: 0.5, y: 0.145, depth: 0.78 },
  },
  {
    id: "crown",
    name: "Crown",
    description:
      "The swirl at the top and back of the head. Thinning here is hard to see yourself, and grafts must follow its circular pattern.",
    anchor: { x: 0.47, y: 0.118, depth: 0.7 },
  },
  {
    id: "donor",
    name: "Donor area",
    description:
      "The back and sides of the head, where hair usually resists thinning. Follicles are taken from here and moved to thinning areas.",
    anchor: { x: 0.675, y: 0.275, depth: 0.73 },
  },
];
