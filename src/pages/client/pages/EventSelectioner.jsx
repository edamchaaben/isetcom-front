import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import InteractivePlan from '../components/InteractivePlan';

function EventSelectioner() {
    const [event, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/event/getid/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 mb-14">
            {event && (
                <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
                    <img src={`http://localhost:3002/${event?.photo}`} alt={event.EventName} className='w-2/5 rounded-lg shadow-lg mb-6'/>
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{event.EventName}</h1>
                    <p className="text-lg text-center mb-6 text-gray-600">{event.description}</p>
                    <div className="text-center mb-6">
                        <p className="text-xl font-semibold text-gray-700">Date Debut: <span className="text-gray-500">{formatDate(event.DateDebut)}</span></p>
                        <p className="text-xl font-semibold text-gray-700">Date Fin: <span className="text-gray-500">{formatDate(event.DateFin)}</span></p>
                    </div>
                    <InteractivePlan event={event}/>
                </div>
            )}
        </div>
    );
}

export default EventSelectioner;
