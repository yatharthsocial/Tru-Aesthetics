import { HEAD_AREAS } from "@/components/headAreas";

export default function HeadAreasList() {
  return (
    <section
      aria-label="Areas of the head"
      className="head-areas-list mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 lg:grid-cols-3"
    >
      {HEAD_AREAS.map(({ id, name, description }, index) => (
        <article key={id}>
          <p className="text-sm font-medium text-brand-deep">0{index + 1}</p>
          <h2 className="mt-1 font-display text-3xl text-foreground">{name}</h2>
          <p className="mt-2 text-ink-muted">{description}</p>
        </article>
      ))}
    </section>
  );
}
