import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

import FloatingAction from './components/FloatingAction';

import Header from './components/Header';

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-slate-50 min-h-screen selection:bg-primary-200 selection:text-primary-900 pt-20">
      <Header />

      <main className="px-4 md:px-12 lg:px-24 pb-24">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <FloatingAction />

      <footer className="bg-gray-100 text-gray-400 py-8 text-center text-xs tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Afonso Benedito</p>
      </footer>
    </div >
  );
}

export default App;
