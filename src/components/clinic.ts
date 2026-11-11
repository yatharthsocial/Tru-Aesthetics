// Clinic details and treatment copy, as supplied by Trú Aesthetics.

export const CLINIC = {
  name: "Trú Aesthetics",
  partner: "Dr Mohan Thomas Aesthetics, Mumbai",
  address: [
    "Lotus Paradise Plaza, Next to St Theresa School",
    "Bendoor, Mangaluru, Karnataka 575002",
  ],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Lotus+Paradise+Plaza+Bendoor+Mangaluru+575002",
  phones: ["+91 78923 45181", "+91 89040 36655"],
  email: "drkirash@truaesthetics.in",
  hours: [
    { days: "Monday – Saturday", time: "10:00 am – 8:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export type Treatment = { name: string; description: string };

export const TREATMENT_GROUPS: {
  id: "surgical" | "non-surgical";
  label: string;
  intro: string;
  items: Treatment[];
}[] = [
  {
    id: "surgical",
    label: "Surgical",
    intro:
      "Our surgical treatments are performed by highly skilled and experienced surgeons, utilising the latest technology and techniques to provide the best possible outcomes for our patients.",
    items: [
      {
        name: "Face Lift",
        description:
          "Revitalise your natural beauty and turn back the hands of time with our transformative facelift procedures. Our skilled surgeons are dedicated to providing personalised solutions that enhance your facial contours, restoring a youthful and refreshed appearance.",
      },
      {
        name: "Eyebrow Lift",
        description:
          "Elevate your gaze and redefine your expression with our expertly performed eyebrow lift procedures. Achieve a more youthful and awake look as our surgeons artfully sculpt and reposition your eyebrows, framing your eyes with grace and sophistication.",
      },
      {
        name: "Neck Lift",
        description:
          "Experience the rejuvenating effects of our neck lift procedures, designed to tighten and contour the delicate neck area. Rediscover a more defined and youthful neck profile, as our surgeons skilfully address sagging skin and wrinkles.",
      },
      {
        name: "Hair Transplant",
        description:
          "Unlock the potential for a fuller, natural-looking head of hair with our advanced hair transplant techniques. Our specialists utilise cutting-edge methods to restore hair growth, providing lasting results and renewed confidence.",
      },
      {
        name: "Rhinoplasty (Nose Job)",
        description:
          "Craft the perfect harmony of facial features with our rhinoplasty procedures. Whether refining the shape, correcting imperfections, or improving functionality, our skilled surgeons create a nose that complements your unique beauty.",
      },
      {
        name: "Eyelid Surgery (Blepharoplasty)",
        description:
          "Illuminate your gaze and diminish signs of ageing with our precision eyelid surgery. Our talented surgeons address excess skin, puffiness, and drooping, revealing eyes that radiate youth and vitality.",
      },
      {
        name: "Liposuction of Face",
        description:
          "Sculpt your facial contours with precision through our facial liposuction procedures. Say goodbye to unwanted fat deposits, achieving a harmonious balance and refined aesthetic.",
      },
      {
        name: "Lip Lift, Reduction and Augmentation",
        description:
          "Enhance the allure of your lips with our comprehensive lip procedures. Whether you desire a subtle lift, reduction, or augmentation, our skilled surgeons tailor each treatment to accentuate your natural beauty.",
      },
      {
        name: "Cheek Implant and Chin Implant",
        description:
          "Accentuate your facial structure with our expertly crafted cheek and chin implant procedures. Achieve balance and symmetry, enhancing your profile for a captivating and harmonious appearance.",
      },
      {
        name: "Otoplasty (Ear Shape Correction)",
        description:
          "Transform your ears with precision and artistry through our otoplasty procedures. Our surgeons specialise in reshaping and repositioning ears, providing a harmonious balance to your facial features.",
      },
      {
        name: "Scar Revision",
        description:
          "Unveil a smoother, more refined complexion with our scar revision techniques. Our skilled surgeons employ advanced methods to minimise the appearance of scars, restoring a flawless canvas.",
      },
      {
        name: "Fat Grafting to the Face",
        description:
          "Restore lost volume and enhance facial contours naturally with our fat grafting procedures. Our skilled surgeons use your body's own fat to sculpt a rejuvenated and youthful appearance.",
      },
      {
        name: "Facial Trauma Management",
        description:
          "Trust our experienced team to provide compassionate and expert care for facial trauma. We specialise in comprehensive management, restoring both function and aesthetics after injuries.",
      },
      {
        name: "Eye Bag Treatment",
        description:
          "Banish tired eyes and rejuvenate your gaze with our specialised eye bag treatments. Our skilled surgeons tailor procedures to address puffiness and sagging, restoring a vibrant and refreshed look.",
      },
      {
        name: "Dimple Creation",
        description:
          "Add a touch of charm to your smile with our dimple creation procedures. Our surgeons skilfully create subtle, natural-looking dimples that enhance your facial expressions.",
      },
      {
        name: "Face Sculpting (Jawline Definition)",
        description:
          "Define and sculpt your jawline with precision through our face sculpting procedures. Our skilled surgeons create a harmonious balance, emphasising your facial structure for a refined appearance.",
      },
      {
        name: "Earlobe Repair / Hole Closure",
        description:
          "Rediscover flawless earlobes with our earlobe repair procedures. Whether repairing tears or closing unwanted piercings, our skilled surgeons restore a natural and aesthetically pleasing look.",
      },
      {
        name: "Cleft Lip Correction",
        description:
          "Transform lives with our cleft lip correction procedures. Our compassionate team is dedicated to providing comprehensive care, restoring facial harmony and function.",
      },
      {
        name: "Forehead Reduction",
        description:
          "Harmonise your facial proportions with our forehead reduction procedures. Our skilled surgeons refine and reshape the forehead, creating a balanced and aesthetically pleasing appearance.",
      },
      {
        name: "Mole Removal",
        description:
          "Achieve a flawless complexion with our mole removal procedures. Our expert surgeons utilise precise techniques to safely and effectively remove unwanted moles, leaving behind smooth and beautiful skin.",
      },
    ],
  },
  {
    id: "non-surgical",
    label: "Non-surgical",
    intro:
      "Non-surgical treatments offer a safe and effective alternative to traditional surgical procedures. Our treatments are designed to enhance your natural beauty.",
    items: [
      {
        name: "Thread Lift for Face and Neck",
        description:
          "Rediscover a youthful lift without the need for surgery with our thread lift procedures for the face and neck. Our skilled practitioners use advanced techniques to subtly lift and tighten sagging skin, restoring a natural and rejuvenated appearance. Experience the benefits of a non-invasive solution that enhances your contours and promotes collagen production for long-lasting results.",
      },
      {
        name: "Liquid Rhinoplasty",
        description:
          "Transform your nose with precision and artistry through our liquid rhinoplasty procedures. Using strategically placed dermal fillers, our skilled practitioners sculpt and reshape the nose, addressing imperfections and creating a harmonious balance with your facial features. Achieve your desired nasal aesthetics without the need for surgery.",
      },
      {
        name: "Dermal Fillers",
        description:
          "Reveal a more youthful and voluminous appearance with our dermal filler treatments. Our expert injectors use FDA-approved fillers to smooth fine lines, restore lost volume, and enhance facial contours. Unleash the power of dermal fillers to rejuvenate and revitalise your natural beauty.",
      },
      {
        name: "Botulinum Toxins",
        description:
          "Turn back the hands of time and reduce the appearance of wrinkles with our botulinum toxin treatments. Our experienced injectors skilfully administer these treatments to relax facial muscles, smoothing lines and wrinkles for a refreshed and youthful look. Trust us to deliver natural-looking results that highlight your unique beauty.",
      },
      {
        name: "Platelet Rich Plasma (PRP)",
        description:
          "Harness the regenerative power of your own blood with our Platelet Rich Plasma (PRP) treatments. Whether used for facial rejuvenation or hair restoration, PRP promotes tissue repair and collagen production, resulting in a naturally radiant complexion or stimulating hair growth for a fuller, healthier mane.",
      },
      {
        name: "Growth Factor Concentrate for Hair Fall",
        description:
          "Combat hair fall and promote hair regrowth with our growth factor concentrate treatments. Our specialised formulas stimulate hair follicles, addressing the root cause of hair loss and fostering a thicker, healthier head of hair. Experience a transformative solution for restoring your crowning glory.",
      },
      {
        name: "Acne Scar Treatment",
        description:
          "Bid farewell to acne scars with our advanced acne scar treatments. Our skilled practitioners utilise a combination of techniques, including laser therapy and dermal fillers, to smooth and minimise the appearance of scars, revealing a flawless complexion. Regain confidence in your skin with our tailored solutions.",
      },
      {
        name: "Double Chin Treatment",
        description:
          "Say goodbye to stubborn submental fat with our double chin treatments. Using non-surgical methods, our skilled practitioners target and reduce excess fat beneath the chin, sculpting a more defined jawline and restoring facial harmony.",
      },
      {
        name: "Lip Augmentation",
        description:
          "Achieve the perfect pout with our lip augmentation procedures. Our expert injectors use dermal fillers to enhance lip volume, shape, and definition, creating natural-looking results that complement your facial features. Embrace fuller, luscious lips that enhance your overall allure.",
      },
      {
        name: "Laser Hair Reduction",
        description:
          "Experience the freedom of smooth, hair-free skin with our laser hair reduction treatments. Our advanced laser technology targets hair follicles, reducing unwanted hair growth with precision and efficiency. Uncover silky-smooth skin and eliminate the need for constant shaving or waxing.",
      },
      {
        name: "Scalp Micropigmentation (SMP)",
        description:
          "Restore the appearance of a full head of hair with our scalp micropigmentation (SMP) procedures. Our skilled practitioners use micro-needles to deposit pigments on the scalp, creating the illusion of a closely cropped hairstyle. Enjoy a natural-looking solution for hair loss without the need for surgery.",
      },
      {
        name: "6D Microblading of Eyebrows",
        description:
          "Define and enhance your eyebrows with our 6D microblading procedures. Our skilled technicians use meticulous techniques to create realistic, hair-like strokes, shaping and filling your eyebrows for a beautifully natural and long-lasting result.",
      },
      {
        name: "IV Fusion Therapy",
        description:
          "Revitalise your body from the inside out with our IV fusion therapy. Our customised intravenous infusions deliver a potent blend of vitamins, minerals, and antioxidants, providing a boost of energy, enhancing skin radiance, and supporting overall well-being.",
      },
    ],
  },
];

export const HAIR_STUDIO = {
  name: "Trú Hair Studio",
  description:
    "Hair Studio offers a wide range of hair services, including cuts, color, and styling, all provided by experienced and skilled stylists. Visit us to achieve your desired look and leave confident and beautiful.",
};
