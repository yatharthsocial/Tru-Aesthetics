// Patient video testimonials (files in public/testimonials). Names are shown only where the
// video itself introduces the patient.
export const TESTIMONIALS: {
  id: string;
  video: string;
  /** Short silent loop that plays in the moving card. */
  preview: string;
  poster: string;
  name?: string;
  caption?: string;
}[] = [
  {
    id: "story-1",
    video: "/testimonials/story-1.mp4",
    preview: "/testimonials/story-1-preview.mp4",
    poster: "/testimonials/story-1.jpg",
    name: "Jafar Jamal",
    caption: "Professional Indian Cricketer",
  },
  {
    id: "story-2",
    video: "/testimonials/story-2.mp4",
    preview: "/testimonials/story-2-preview.mp4",
    poster: "/testimonials/story-2.jpg",
    name: "Mohammed Hussain",
  },
  {
    id: "story-3",
    video: "/testimonials/story-3.mp4",
    preview: "/testimonials/story-3-preview.mp4",
    poster: "/testimonials/story-3.jpg",
  },
  {
    id: "story-4",
    video: "/testimonials/story-4.mp4",
    preview: "/testimonials/story-4-preview.mp4",
    poster: "/testimonials/story-4.jpg",
  },
  {
    id: "story-5",
    video: "/testimonials/story-5.mp4",
    preview: "/testimonials/story-5-preview.mp4",
    poster: "/testimonials/story-5.jpg",
  },
];
