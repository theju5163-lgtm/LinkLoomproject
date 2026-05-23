import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <ProductCard />
      <Footer />
    </>
  );
}

export default Home;