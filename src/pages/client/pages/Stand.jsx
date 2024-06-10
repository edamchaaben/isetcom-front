import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';

function StandSelection() {
    const [stands, setStands] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3002/stand/all');
                setStands(response.data);
            } catch (error) {
                setError('Erreur lors du chargement des stands.');
                console.error('Erreur lors du chargement des stands :', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleClick = async (id) => {
        try {
            await axios.post(`http://localhost:3002/reservation`, {
                standId: id,
                userId: currentUser._id,
            });
            setStands(prevStands =>
                prevStands.map(stand =>
                    stand._id === id ? { ...stand, reserved: true, reservedBy: currentUser._id } : stand
                )
            );
            alert('Stand réservé avec succès');
        } catch (error) {
            console.error('Erreur lors de la réservation du stand :', error);
            alert('Erreur lors de la réservation du stand.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Liste des stands</h2>
            {loading ? (
                <div className="text-center">Chargement...</div>
            ) : error ? (
                <div className="text-red-500">Erreur: {error}</div>
            ) : stands.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stands.map(stand => (
                        <li key={stand._id} className="bg-white shadow-md rounded p-4">
                            <h3 className="text-xl font-bold mb-2">Stand {stand.Numero}</h3>
                            <p className="text-gray-700 mb-2">Prix: {stand.prix} $</p>
                            <p className="text-gray-700 mb-2">Superficie: {stand.superficie}</p>
                            <p className={`text-sm font-semibold ${stand.reserved ? 'text-red-500' : 'text-green-500'}`}>
                                {stand.reserved ? 'Réservé' : 'Disponible'}
                            </p>
                            {!stand.reserved && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out w-52"
                                    onClick={() => handleClick(stand._id)}
                                    disabled={stand.reserved}
                                >
                                    Réserver
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Aucun stand trouvé</div>
            )}
        </div>
    );
}

export default StandSelection;
