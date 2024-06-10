import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import styled from "styled-components";

export default function ReservationHistory() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const getUserReservations = async () => {
    try {
      if (currentUser && currentUser._id) {
        const response = await axios.get(`http://localhost:3002/api/reservation/user/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
        setReservations(response.data);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Failed to fetch reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserReservations();
  }, [currentUser._id, currentUser.token]);

  const cancelReservation = async (reservationId, StandId) => {
    try {
      await axios.delete(`http://localhost:3002/api/reservation/${reservationId}/${StandId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      const newReservations = reservations.filter((reservation) => reservation._id !== reservationId);
      setReservations(newReservations);
    } catch (error) {
      setError("Failed to cancel reservation.");
    }
  };

  const updateReservation = async (reservationId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3002/api/reservation/${reservationId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      setReservations(reservations.map((reservation) => reservation._id === reservationId ? response.data : reservation));
    } catch (error) {
      setError("Failed to update reservation.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <Section>
      <h2 className="text-3xl font-bold mb-6">My Reservations</h2>
      {reservations.length > 0 ? (
        <div className="reservation-list">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation">
              
              <div className="content">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Stand Number: {reservation.Stand ? reservation.Stand.numero : "N/A"}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-bold">Company:</span> {reservation.companyName}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-bold">Description:</span> {reservation.companyDescription}
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedData = {
                      companyName: e.target.companyName.value,
                      companyDescription: e.target.companyDescription.value,
                    };
                    updateReservation(reservation._id, updatedData);
                  }}
                  className="mt-4"
                >
                  <div className="flex flex-col gap-4 mb-4">
                    <input
                      name="companyName"
                      placeholder="Company Name"
                      defaultValue={reservation.companyName}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      name="companyDescription"
                      placeholder="Description"
                      defaultValue={reservation.companyDescription}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => cancelReservation(reservation._id, reservation.Stand ? reservation.Stand._id : null)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reservations found.</p>
      )}
    </Section>
  );
}

const Section = styled.section`
  padding: 5rem 0;
  .reservation-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  .reservation {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: aliceblue;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;
    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .icon {
      img {
        height: 2.4rem;
      }
    }
  }
  .content {
    .text-xl {
      margin-bottom: 1rem;
    }
    .text-sm {
      margin-bottom: 0.5rem;
    }
    form {
      .flex {
        gap: 0.5rem;
        input {
          padding: 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid #ccc;
        }
        button {
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }
`;

