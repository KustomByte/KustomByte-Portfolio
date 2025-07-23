import Header from '@/components/Layout/Header';
import Hero from '@/components/Sections/Hero';
import About from '@/components/Sections/About';
import Portfolio from '@/components/Sections/Portfolio';
import Contact from '@/components/Sections/Contact';
import Footer from '@/components/Layout/Footer';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
