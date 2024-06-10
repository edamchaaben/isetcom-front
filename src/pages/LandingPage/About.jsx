import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const About = () => {
  const [detectionCount, setDetectionCount] = useState(0);

  useEffect(() => {
    // Configuration du client MQTT
    const client = mqtt.connect('ws://test.mosquitto.org:8081');

    // Connexion au broker
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('test/counter', (err) => {
        if (err) {
          console.error('Subscription error:', err);
        }
      });
    });

    // Réception des messages
    client.on('message', (topic, message) => {
      if (topic === 'test/counter') {
        const countStr = message.toString().split(': ')[1];
        setDetectionCount(parseInt(countStr, 10));
      }
    });

    // Nettoyage lors du démontage du composant
    return () => {
      client.end();
    };
  }, []);

  return (
    <section id="about" className="p-8 bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-xl uppercase font-bold mb-2 text-[#A67C52] flex items-center justify-center">
            <span className="border-t-2 border-[#A67C52] w-12 mr-4"></span>
            À Propos
            <span className="border-t-2 border-[#A67C52] w-12 ml-4"></span>
          </h2>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to <span className="text-[#A67C52]">EVENTOPIA</span></h1>
          <p className="text-lg mb-4">
            Bienvenue sur notre plateforme, où les exposants peuvent réserver des stands en consultant les événements de la foire et en voyant les détails, y compris le plan de la foire selon l'événement. Les exposants peuvent voir la description des stands et les réserver à partir de ce plan. Les visiteurs peuvent consulter les événements et le plan pour voir les noms des exposants présents à chaque événement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">7861</h3>
              <p>Reservations</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">1234</h3>
              <p>Exposants</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">4321</h3>
              <p>Clients</p>
            </div>
            <div className="text-center detection-count">
              <h3 className="text-2xl font-bold">{detectionCount}</h3>
              <p>places disponibles </p>
            </div>
          </div>
          <button className="bg-[#A67C52] text-white px-6 py-2 rounded-full">Explore More</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2">
            <img src="/image.1.jpg" alt="Hotel 1" className="w-full h-full object-cover rounded-lg" />
          </div>
          <img src="/image.jpeg" alt="Hotel 2" className="w-full h-40 object-cover rounded-lg" />
          <img src="/image.3.jpg" alt="Hotel 3" className="w-full h-40 object-cover rounded-lg" />
          <img src="/image4.png" alt="Hotel 4" className="w-full h-40 object-cover rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default About;
