import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleSignInSignUp = () => {
    navigate('/auth');
  };

  return (
    <div 
      className="hero-section flex items-center justify-center h-96"
      style={{
        backgroundImage: "url('/Landing.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="text-center relative z-10">
        <h2 className="text-5xl font-bold text-white mb-4">Faisons de nos événements un succès</h2>
        <div className="flex space-x-4 justify-center">
          <button onClick={handleSignInSignUp} className="bg-light-brown text-white px-4 py-2 text-base rounded-full w-40">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
