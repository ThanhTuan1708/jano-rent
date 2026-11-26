import { ContactSection, Footer } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { FaqSection, ProcessSection } from "@/components/InfoSections";
import { FeedbackGallery } from "@/components/FeedbackGallery";
import { Notices } from "@/components/Notices";
import { PriceGallery } from "@/components/PriceGallery";
import { Storefront } from "@/components/Storefront";
import { ToastProvider } from "@/components/Toast";

export default function HomePage() {
  return (
    <ToastProvider>
      <Storefront
        intro={
          <>
            <Hero />
            <Notices />
          </>
        }
      >
        <PriceGallery />
        <FeedbackGallery />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </Storefront>
      <Footer />
    </ToastProvider>
  );
}
