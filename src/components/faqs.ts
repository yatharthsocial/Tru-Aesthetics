import { CLINIC } from "@/components/clinic";

// Frequently asked questions. Drafted from general guidance on these treatments: the clinic
// should review the wording (and any timings) before launch.
export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Is a hair transplant permanent?",
    answer:
      "Grafts are usually taken from the back and sides of the scalp, where hair resists thinning, so transplanted hair tends to keep growing for life. Your existing hair can still thin with time, which we plan for at your consultation.",
  },
  {
    question: "When will I see the results of a hair transplant?",
    answer:
      "The transplanted hairs usually shed in the first few weeks, which is expected. New growth typically begins around three to four months, and the fuller result shows at about nine to twelve months.",
  },
  {
    question: "Does the procedure hurt?",
    answer:
      "Procedures are done under local anaesthesia, so most patients feel little beyond the first few injections. Your doctor will also plan pain relief for the days that follow.",
  },
  {
    question: "How long is the recovery?",
    answer:
      "It depends on the treatment. Non-surgical treatments such as Botox and fillers usually need little or no downtime, while surgical procedures need anywhere from a few days to a few weeks. You will get a recovery plan made for you.",
  },
  {
    question: "Are Botox and fillers safe, and how long do they last?",
    answer:
      "Performed by trained doctors using approved products, they are well-established treatments. Their effects are temporary: Botox typically lasts three to four months, and fillers from around six to eighteen months, depending on the product and area.",
  },
  {
    question: "How many laser hair reduction sessions will I need?",
    answer:
      "Most people need a course of six to eight sessions, a few weeks apart, because the laser works on hair in its active growth phase. The exact number depends on your skin, hair type and the area treated.",
  },
  {
    question: "Will my results look natural?",
    answer:
      "That is the aim of every plan we make: subtle, balanced changes that suit your features, never an overdone look.",
  },
  {
    question: "What happens at the first consultation?",
    answer:
      "You meet the doctor, talk through your goals and medical history, and get an honest view of which options suit you, what to expect and what it will cost, before you decide anything.",
  },
  {
    question: "How much does treatment cost?",
    answer:
      "It depends on the treatment and how much is needed; for a hair transplant, for example, on the number of grafts. You will get a clear quote after your consultation.",
  },
  {
    question: "How do I book a consultation?",
    answer: `Call us on ${CLINIC.phones.join(" or ")}, or email ${CLINIC.email}. We are open ${CLINIC.hours[0].days}, ${CLINIC.hours[0].time}, at ${CLINIC.address.join(", ")}.`,
  },
];
