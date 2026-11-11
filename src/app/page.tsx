import AboutSection from "@/components/About";
import ContactSection from "@/components/ContactSection";
import DoctorSection from "@/components/DoctorSection";
import HeadAreasList from "@/components/HeadAreasList";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TreatmentsCatalog from "@/components/TreatmentsCatalog";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <HeadAreasList />
        <AboutSection />
        <DoctorSection />
        <ServicesSection />
        <TreatmentsCatalog />
        <TestimonialsSection />
      </main>
      <ContactSection />
    </>
  );
}
