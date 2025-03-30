
import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import { InteractiveTools } from "./InteractiveTools";
import { TestimonialsSection } from "./TestimonialsSection";
import { CTASection } from "./CTASection";

export function FuturisticLanding() {
  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <InteractiveTools />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
