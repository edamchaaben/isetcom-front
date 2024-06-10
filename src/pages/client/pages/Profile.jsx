import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import Swal from 'sweetalert2';

function Profile() {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3002/users/${currentUser._id}`);
        setUser(userResponse.data);
        setUpdatedUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updatedUser.name);
      formData.append('email', updatedUser.email);
      formData.append('phone', updatedUser.phone);
      formData.append('password', updatedUser.password);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await axios.put(`http://localhost:3002/users/${currentUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axios.get(`http://localhost:3002/users/${currentUser._id}`);
      setUser(response.data);
      setUpdatedUser(response.data);
      Swal.fire('Succès', 'Mise à jour du profil réussie', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Erreur', 'Échec de la mise à jour du profil', 'error');
    }
  };

  const getUserReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/reservation/user/${currentUser._id}/withStands`);
      setUserReservations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserReservations();
  }, [currentUser._id]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
      <div className="profile-card">
        <div className="md:flex">
          <div className="w-full p-4">
            <div className="profile-details">
              <img className="h-24 w-24 rounded-full mx-auto shadow-md" src={`http://localhost:3002/${updatedUser.photo}`} alt="User Profile" />
              <h2>{user.username || 'Username'}</h2>
              <p>{user.email || 'User Email'}</p>
            </div>
            <div className="profile-input">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedUser.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-input">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={updatedUser.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-input">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={updatedUser.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-input">
              <label htmlFor="photo">Photo:</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="profile-input">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={updatedUser.password || ''}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className="profile-button"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl mt-6">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Reservations</h2>
          {userReservations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {userReservations.map((reservation) => (
                <li key={reservation._id} className="py-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900">{reservation.stand?.StandName}</p>
                      <p className="text-sm text-gray-500">Location: {reservation.stand?.Location}</p>
                    </div>
                    <div>
                      {reservation.acceptation ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Accepté
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          En attente
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
