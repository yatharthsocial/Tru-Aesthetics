export type HeadArea = {
  id: string;
  name: string;
  description: string;
  side: "left" | "right";
  /** Marker position on the portrait, as a fraction of the image. */
  anchor: { x: number; y: number; depth: number };
  view: {
    zoom: number;
    focusX: number;
    focusY: number;
    panX: number;
    yaw: number;
    pitch: number;
  };
};

export const HEAD_AREAS: HeadArea[] = [
  {
    id: "hairline",
    name: "Hairline",
    description:
      "The front edge that frames the face. It is planned around your age, face shape and natural direction of growth.",
    side: "right",
    anchor: { x: 0.5, y: 0.185, depth: 0.84 },
    view: { zoom: 1.14, focusX: 0.5, focusY: 0.22, panX: -0.17, yaw: -0.25, pitch: 0.55 },
  },
  {
    id: "temples",
    name: "Temples",
    description:
      "The corners either side of the forehead, where recession often begins. Restoring them brings balance back to the hairline.",
    side: "left",
    anchor: { x: 0.645, y: 0.235, depth: 0.78 },
    view: { zoom: 1.16, focusX: 0.6, focusY: 0.26, panX: 0.17, yaw: 0.75, pitch: 0.3 },
  },
  {
    id: "mid-scalp",
    name: "Mid-scalp",
    description:
      "The zone behind the hairline. Density here keeps hair looking full from the front and from above.",
    side: "right",
    anchor: { x: 0.5, y: 0.145, depth: 0.78 },
    view: { zoom: 1.14, focusX: 0.5, focusY: 0.18, panX: -0.17, yaw: -0.3, pitch: 1 },
  },
  {
    id: "crown",
    name: "Crown",
    description:
      "The swirl at the top and back of the head. Thinning here is hard to see yourself, and grafts must follow its circular pattern.",
    side: "left",
    anchor: { x: 0.47, y: 0.118, depth: 0.7 },
    view: { zoom: 1.12, focusX: 0.47, focusY: 0.18, panX: 0.17, yaw: 0.35, pitch: 1 },
  },
  {
    id: "donor",
    name: "Donor area",
    description:
      "The back and sides of the head, where hair usually resists thinning. Follicles are taken from here and moved to thinning areas.",
    side: "right",
    anchor: { x: 0.675, y: 0.275, depth: 0.73 },
    view: { zoom: 1.16, focusX: 0.62, focusY: 0.3, panX: -0.17, yaw: -0.7, pitch: 0.1 },
  },
];
