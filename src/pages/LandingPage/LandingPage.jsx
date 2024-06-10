import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Events from './Events';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Services />
      <Events />
    </div>
  );
};

export default LandingPage;
