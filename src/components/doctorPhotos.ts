import type { StaticImageData } from "next/image";
import kirash from "@/doctor-kirash.webp";
import mohan from "@/doctor-mohan-thomas.webp";

/** Portrait per doctor slug, with the crop that frames them in a 4:5 card. */
export const DOCTOR_PHOTOS: Record<
  string,
  { src: StaticImageData; className: string }
> = {
  "dr-kirash-parthipady": {
    src: kirash,
    className: "origin-[47%_20%] scale-[1.22] object-cover object-[47%_25%]",
  },
  "prof-dr-mohan-thomas": {
    src: mohan,
    className: "object-cover object-[50%_20%]",
  },
};
