import PageLayout from "../components/layout/PageLayout.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import AboutSection from "../components/home/AboutSection.jsx";
import WorkshopSection from "../components/home/WorkshopSection.jsx";
import ProductsSection from "../components/home/ProductsSection.jsx";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection.jsx";
import ContactCTA from "../components/home/ContactCTA.jsx";

function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <WorkshopSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <ContactCTA />
    </PageLayout>
  );
}

export default Home;