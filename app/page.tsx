import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { HomeReviewsSection } from "@/components/home/HomeReviewsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedItems />
      <HomeReviewsSection />
    </div>
  );
}
