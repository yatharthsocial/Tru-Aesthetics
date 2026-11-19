import AboutSection from "@/components/About";
import ContactSection from "@/components/ContactSection";
import DoctorSection from "@/components/DoctorSection";
import FaqSection from "@/components/FaqSection";
import HairTransplantSection from "@/components/HairTransplantSection";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SmoothScroll from "@/components/SmoothScroll";
import TestimonialsSection from "@/components/TestimonialsSection";
import TreatmentsCatalog from "@/components/TreatmentsCatalog";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <DoctorSection />
        <ServicesSection />
        <TreatmentsCatalog />
        <TestimonialsSection />
        <HairTransplantSection />
        <FaqSection />
      </main>
      <ContactSection />
    </>
  );
}
