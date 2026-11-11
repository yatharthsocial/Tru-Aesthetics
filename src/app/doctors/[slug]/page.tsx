import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import { DOCTORS, doctorHref, initials } from "@/components/doctor";
import SiteHeader from "@/components/SiteHeader";
import { DOCTOR_PHOTOS } from "@/components/doctorPhotos";
import silk from "@/hero-silk.webp";

export async function generateStaticParams() {
  return DOCTORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/doctors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doctor = DOCTORS.find((item) => item.slug === slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} | Trú Aesthetics`,
    description: `${doctor.name}, ${doctor.degrees}. ${doctor.role}.`,
  };
}

export default async function DoctorPage({
  params,
}: PageProps<"/doctors/[slug]">) {
  const { slug } = await params;
  const doctor = DOCTORS.find((item) => item.slug === slug);
  if (!doctor) notFound();
  const others = DOCTORS.filter((item) => item.slug !== slug);
  const photo = DOCTOR_PHOTOS[doctor.slug];

  return (
    <>
      <main className="flex-1">
        {/* data-ready lets the shared header play its entrance outside the hero. */}
        <section
          data-ready="true"
          className="relative isolate overflow-hidden bg-[#e3eaea] px-5 pt-32 pb-20 lg:px-[6%] lg:pt-40 lg:pb-28"
        >
          <Image
            src={silk}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#eef3f3]/40 to-[#eef3f3]"
          />
          <SiteHeader base="/" />

          <div className="mx-auto max-w-[1400px]">
            <Link
              href="/#doctor"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-deep hover:underline"
            >
              <span aria-hidden="true">←</span> Back to our doctors
            </Link>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
              <div className="mx-auto w-full max-w-[420px]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-gradient-to-b from-[#f4f8f8] via-[#dbe5e5] to-[#c3d1d1] shadow-[0_24px_60px_rgba(45,70,75,0.2)]">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={`${doctor.name} at Trú Aesthetics`}
                      fill
                      priority
                      sizes="420px"
                      quality={90}
                      className={photo.className}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center font-display text-8xl text-brand-deep/60"
                    >
                      {initials(doctor.name)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium tracking-[0.2em] text-brand-deep uppercase">
                  Our doctors
                </p>
                <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl xl:text-7xl">
                  {doctor.name}
                </h1>
                <p className="mt-3 text-sm font-medium tracking-[0.15em] text-ink-muted uppercase">
                  {doctor.role}
                </p>
                <p className="mt-2 text-sm text-brand-deep">{doctor.degrees}</p>
                {doctor.intro && (
                  <p className="mt-7 max-w-2xl border-l-2 border-brand pl-5 text-base leading-relaxed text-ink-muted lg:text-lg">
                    {doctor.intro}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eef3f3] px-5 pb-24 lg:px-[6%] lg:pb-32">
          <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div>
              <h2 className="text-sm font-medium tracking-[0.2em] text-foreground uppercase">
                Qualifications & experience
              </h2>
              <ul className="mt-6 space-y-3">
                {doctor.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 rounded-2xl bg-pill/90 px-5 py-4 text-foreground shadow-[0_6px_18px_rgba(45,70,75,0.1)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {doctor.story.length > 0 && (
                <article className="space-y-5 text-base leading-relaxed text-ink-muted lg:text-lg">
                  {doctor.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              )}

              <div className={doctor.story.length > 0 ? "mt-12" : ""}>
                <h2 className="text-sm font-medium tracking-[0.2em] text-foreground uppercase">
                  Meet the rest of the team
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={doctorHref(other.slug)}
                        className="group flex h-full items-center gap-4 rounded-3xl bg-pill/90 p-5 shadow-[0_10px_30px_rgba(45,70,75,0.12)] transition-transform hover:-translate-y-1"
                      >
                        <span
                          aria-hidden="true"
                          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 font-display text-xl text-brand-deep ring-1 ring-brand/30"
                        >
                          {initials(other.name)}
                        </span>
                        <span>
                          <span className="block font-display text-xl leading-tight text-foreground group-hover:text-brand-deep">
                            {other.name}
                          </span>
                          <span className="mt-1 block text-xs text-ink-muted">
                            {other.degrees}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className="mt-10 inline-block rounded-full bg-brand px-10 py-3.5 text-base font-medium whitespace-nowrap text-ink shadow-[0_8px_20px_rgba(18,122,115,0.28)] transition-colors hover:bg-brand-deep hover:text-white"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
    </>
  );
}
