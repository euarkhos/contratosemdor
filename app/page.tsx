import { LandingHeader } from "@/components/landing/landing-header";
import {
  LandingFooter,
  LandingHero,
  LandingMain,
  LandingPoints,
  LandingQuotes,
  LandingReviews,
  LandingStart,
  LandingWhy,
} from "@/components/landing/landing-sections";

export default function HomePage() {
  return (
    <div className="lp-page">
      <LandingHeader />
      <main className="lp-main">
        <LandingHero />
        <LandingQuotes />
        <LandingMain />
        <LandingPoints />
        <LandingReviews />
        <LandingWhy />
        <LandingStart />
      </main>
      <LandingFooter />
    </div>
  );
}
