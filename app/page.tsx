import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ExploreSection from "@/components/ExploreSection";
import DestinationExplorer from "@/components/DestinationExplorer";
import Experiences from "@/components/Experiences";
import TravelPackages from "@/components/TravelPackages";
import TripPlanner from "@/components/TripPlanner";
import LocalCulture from "@/components/LocalCulture";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628] overflow-x-hidden">
      <Navbar />
      <Hero />
      <ExploreSection />
      <DestinationExplorer />
      <Experiences />
      <TravelPackages />
      <TripPlanner />
      <LocalCulture />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
