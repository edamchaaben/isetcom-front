import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import Stand from "./Stand";

export default function InteractivePlan({ event }) {
  const [stands, setStands] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchStands = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/Stands/all");
        setStands(response.data);
      } catch (error) {
        console.error("Error fetching stands:", error);
      }
    };

    const fetchReservations = async () => {
      try {
        const eventReservations = event.reservations;
        setReservations(eventReservations);
      } catch (e) {
        console.error("Error fetching reservations:", e);
      }
    };

    fetchStands();
    fetchReservations();
  }, [event]);

  const updateStands = (updatedStand) => {
    setStands((prevStands) =>
      prevStands.map((stand) =>
        stand._id === updatedStand._id ? updatedStand : stand
      )
    );
  };

  const renderStands = (start, end) =>
    stands
      .sort((a, b) => a.StandId - b.StandId)
      .slice(start, end)
      .map((stand) => (
        <Stand
          key={stand._id}
          reservations={reservations}
          Stand={stand}
          user={currentUser}
          setStands={setStands}
          updateStands={updateStands}
          eventId={event?._id ?? ""}
        />
      ));

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <div className="relative w-full text-center bg-white shadow-md mb-4">
        <div className="flex justify-center items-center py-4">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">MAIN ENTRANCE</span>
            <img src="/icons/Entrance.png" alt="Down Arrow" height="48" width="48" />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-300 flex items-center justify-center">
              <img src="/icons/coffee.svg" alt="Coffee" className="w-full h-full" />
            </div>
            <span className="ml-2">Break Out</span>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-300 flex items-center justify-center">
              <img src="/icons/coffee.svg" alt="Coffee" className="w-full h-full" />
            </div>
            <span className="ml-2">Loading Bay</span>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-4 bg-white shadow-lg">
          <div className="flex gap-8">
            <div className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-2">
              {renderStands(0, 4)}
            </div>
            <div className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-2">
              {renderStands(4, 8)}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-2">
              {renderStands(8, 12)}
            </div>
            <div className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-2">
              {renderStands(12, 16)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-300 flex items-center justify-center">
              <img src="/icons/hotdog.svg" alt="Hotdog" className="w-full h-full" />
            </div>
            <span className="ml-2">Plenary</span>
          </div>
        </div>
      </div>
      <footer className="w-full text-center text-xl font-bold p-4 bg-white shadow-md">
        LOADING BAY
      </footer>
    </div>
  );
}
