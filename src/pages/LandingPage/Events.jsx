import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Event() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/event/all');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleConsulter = (id) => {
    navigate(`/event-detail/${id}`);
  };

  return (

    <section id="Events" className="p-8 bg-gray-100 text-black">   
      <div className="container mx-auto p-4"  >
        <div className="text-center mb-8">
          <h2 className="text-xl uppercase font-bold mb-2 text-light-brown flex items-center justify-center">
            <span className="border-t-2 border-light-brown w-12 mr-4"></span>
            Nos Événements
            <span className="border-t-2 border-light-brown w-12 ml-4"></span>
          </h2>
          <h1 className="text-5xl font-bold text-gray-800">Explorez Nos <span className="text-light-brown">ÉVÉNEMENTS</span></h1>
        </div>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-red-500">Erreur: {error}</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {events.map(event => (
              <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto mb-0.5">
                <img src={`http://localhost:3002/${event.photo}`} alt={event.EventName} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{event.EventName}</h3>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <p className="text-gray-700 mb-2">Date de début: {new Date(event.DateDebut).toLocaleDateString()}</p>
                  <p className="text-gray-700 mb-4">Date de fin: {new Date(event.DateFin).toLocaleDateString()}</p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => handleConsulter(event._id)} className="bg-light-brown text-white py-1 px-3 rounded hover:bg-light-brown-dark focus:outline-none focus:bg-light-brown-dark">
                      Voir Détail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Aucun événement trouvé</div>
        )}
      </div>
  </section>
    
  );
}

export default Event;
