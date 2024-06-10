import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-1 bg-[#A67C52] text-white">
      <h1 className="text-2xl font-bold">EVENTOPIA</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="text-white">Page d'accueil</a></li>
          <li><a href="#about" className="text-white">A PROPOS</a></li>
          <li><a href="#services" className="text-white">SERVICES</a></li>
          <li><a href="#Events" className="text-white">EVENEMENTS</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
