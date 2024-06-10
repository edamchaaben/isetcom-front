import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reservation() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3002/reservation');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleAcceptReservation = async (reservationId, userId, standId) => {
    try {
      await axios.put(`http://localhost:3002/reservation/update/${userId}/${standId}`, { acceptation: true });
      setReservations(prevReservations => {
        return prevReservations.map(reservation => {
          if (reservation._id === reservationId) {
            return { ...reservation, acceptation: true };
          }
          return reservation;
        });
      });
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  return (
    <div className="container m-auto w-96 px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Reservations</h2>
      {reservations.map(reservation => (
        <div key={reservation._id} className="border border-gray-200 p-4 rounded mb-4">
          <h3 className="text-lg font-semibold mb-2">User: {reservation.user.name}</h3>
          <p className="mb-2">Stand Numero: {reservation.stand?.Numero}</p>
          <p className="mb-2">Prix: {reservation.stand?.prix}</p>
          <p className="mb-2">Superficie: {reservation.stand?.superficie}</p>
          {!reservation.acceptation && (
            <button 
              onClick={() => handleAcceptReservation(reservation._id, reservation.user._id, reservation.stand?._id)} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Accept Reservation
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Reservation;
