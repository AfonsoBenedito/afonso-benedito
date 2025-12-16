import Hero from '../../components/Hero';
import About from '../../features/about/components/About';
import Experience from '../../features/experience/components/Experience';
import Education from '../../features/education/components/Education';
import Projects from '../../features/projects/components/Projects';
import Contact from '../../features/contact/components/Contact';

import FloatingAction from '../../components/FloatingAction';

import Header from '../../components/Header';

function Home() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-slate-50 min-h-screen selection:bg-primary-200 selection:text-primary-900 pt-12 md:pt-20">
      <Header />

      <main className="px-4 md:px-12 lg:px-24 pb-6 md:pb-12">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>

      <FloatingAction />
    </div >
  );
}

export default Home;
