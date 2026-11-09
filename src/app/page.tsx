import AboutSection from "@/components/About";
import DoctorSection from "@/components/DoctorSection";
import HeadAreasList from "@/components/HeadAreasList";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <HeadAreasList />
      <AboutSection />
      <DoctorSection />
      <ServicesSection />
    </main>
  );
}
