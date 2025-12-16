import { Suspense, lazy } from 'react';
import Hero from '../../components/Hero';

const About = lazy(() => import('../../features/about/components/About'));
const Experience = lazy(() => import('../../features/experience/components/Experience'));
const Education = lazy(() => import('../../features/education/components/Education'));
const Projects = lazy(() => import('../../features/projects/components/Projects'));
const Contact = lazy(() => import('../../features/contact/components/Contact'));

import FloatingAction from '../../components/FloatingAction';

import Header from '../../components/Header';

function Home() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-slate-50 min-h-screen selection:bg-primary-200 selection:text-primary-900 pt-12 md:pt-20">
      <Header />

      <main className="px-4 md:px-12 lg:px-24 pb-6 md:pb-12">
        <Hero />
        <Suspense fallback={<div className="py-12 text-center text-gray-400">Loading section...</div>}>
          <About />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </Suspense>
      </main>

      <FloatingAction />
    </div >
  );
}

export default Home;
