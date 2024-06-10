import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StandDetail = ({ reservations, Stand, user, setStands, updateStands, eventId }) => {
  const ref = useRef(null);
  const [isReserved, setReserved] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [reservation, setReservation] = useState({
    Stand: "",
    user: "",
    companyName: "",
    companyDescription: "",
  });

  const postReservation = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post("http://localhost:3002/api/reservation", {
        StandId: Stand._id,
        userId: user._id,
        companyName,
        companyDescription,
      });
      await axios.post(
        `http://localhost:3002/event/addReservation/${eventId}`,
        { reservation: data.data._id }
      );
      setReserved(true);
      setCompanyDescription(event.target.companyDescription.value);
      setCompanyName(event.target.companyName.value);
      updateStands({ ...Stand, disponibilite: false });
      ref.current.close();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Only 2 reservation by User"
      ) {
        ref.current.close();
        Swal.fire({
          icon: "error",
          title: "Limite atteinte",
          text: "Vous ne pouvez réserver que 2 stands au maximum.",
          position: "center",
          showConfirmButton: false,
          timer: 4000,
        });
      } else {
        console.error("Error posting reservation:", error);
      }
    }
  };

  useEffect(() => {
    const reservation = reservations.find(
      (reservation) => reservation.Stand === Stand._id
    );
    if (reservation !== undefined) {
      setReservation(reservation);
      setReserved(!Stand.disponibilite);
      setCompanyName(reservation.companyName);
      setCompanyDescription(reservation.companyDescription);
    } else {
      setReservation({
        Stand: "",
        user: "",
        companyName: "",
        companyDescription: "",
      });
      setReserved(false);
    }
  }, [reservations, Stand._id, Stand.disponibilite]);

  return (
    <>
      <button
        title={
          isReserved
            ? reservation.companyName === ""
              ? companyName
              : reservation.companyName
            : Stand.id
        }
        onClick={() => ref.current?.showModal()}
        className={`relative flex select-none items-center justify-center truncate rounded-lg p-4 ${
          isReserved ? "bg-red-500" : "bg-green-500"
        } transition duration-200 ease-in-out hover:scale-105 col-span-${
          Stand.colSpan || 1
        } row-span-${Stand.rowSpan || 1}`}
      >
        <span className="absolute left-2 top-1 text-sm font-semibold text-white/50">
          {Stand.id}
        </span>
        <span className="w-1/2 truncate text-white font-semibold">
          {isReserved
            ? reservation.companyName === ""
              ? companyName
              : reservation.companyName
            : "A"}
        </span>
      </button>
      <dialog
        ref={ref}
        className="invisible block scale-90 rounded-lg transition-all backdrop:bg-black/70 backdrop:backdrop-blur-sm open:visible open:scale-100"
      >
        <div className="flex flex-col items-center justify-center gap-5 p-4">
          <button onClick={() => ref.current.close()}>Exit</button>
          <h1 className="text-2xl text-zinc-900">Stand {Stand.id}</h1>
          {isReserved ? (
            <>
              <p className="text-xl text-gray-700">Nom de l'entreprise: {companyName}</p>
              <p className="text-gray-700">Description: {companyDescription}</p>
            </>
          ) : (
            <p className="text-xl text-gray-700">This stand is still available.</p>
          )}
        </div>
      </dialog>
    </>
  );
};

export default StandDetail;
