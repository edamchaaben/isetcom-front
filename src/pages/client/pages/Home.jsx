import React, { useEffect, useState } from 'react';
import Slide from '../components/Slide';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Services from '../components/Services';

function Home() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/event/all');
        const eventsToShow = showAllEvents ? response.data : response.data.slice(0, 5);
        setEvents(eventsToShow);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [showAllEvents]);

  return (
    <div className="min-h-screen flex flex-col">
      <Slide />
      <Services />
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-96 cursor-pointer">
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-red-500">Erreur: {error}</div>
        ) : (
          <>
            {events.map(event => (
              <Link to={'/event-selectione/'+event?._id} key={event._id}>
                <div className="bg-white shadow-md rounded p-4 flex flex-col">
                  <img src={`http://localhost:3002/${event?.photo}`} alt={event?.EventName} className="w-full h-40 object-cover rounded mb-2" />
                  <h3 className="text-xl font-bold mb-2">{event?.EventName}</h3>
                  <p className="text-gray-700 mb-2">{event?.description}</p>
                  <p className="text-gray-700">Date de début: {new Date(event.DateDebut).toLocaleDateString()}</p>
                  <p className="text-gray-700">Date de fin: {new Date(event.DateFin).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>

      <footer className="bg-gray-800 text-gray-300 py-4 text-center mt-12">
        <div className="container mx-auto">
          <p className="text-sm">
            © 2024 Votre entreprise. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
