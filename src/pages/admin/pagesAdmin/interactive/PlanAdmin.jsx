import axios from "axios";
import { useEffect, useState } from "react";
import "./Planadmin.css"; // Assurez-vous d'importer le fichier CSS

export default function AdminPage() {
  const [Stands, setStands] = useState([]);
  const [newStand, setNewStand] = useState({
    id: "",
    superficie: "",
    prix: "",
    disponibilite: true,
  });
  const [editingStand, setEditingStand] = useState(null);

  const [StandIds, setStandIds] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13]);

  useEffect(() => {
    const fetchStands = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/Stands/all");
        setStands(response.data);
       response.data.forEach(Stand => {
    setStandIds(prevStandIds => prevStandIds.filter(id => id !== Stand.id));
});
      } catch (error) {
        console.error("Error fetching Stands:", error);
      }
    };
    fetchStands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStand((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/api/Stands", newStand);
      console.log(e)
      setStands([...Stands, response.data]);
      setNewStand({
        id: "",
        superficie: "",
        prix: "",
        disponibilite: true,
      });
    } catch (error) {
      console.error("Error creating Stand:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingStand((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3002/api/Stands/${editingStand._id}`, editingStand);
      setStands(Stands.map((Stand) => (Stand._id === editingStand._id ? response.data : Stand)));
      setEditingStand(null);
    } catch (error) {
      console.error("Error updating Stand:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Id is " + id)
      await axios.delete(`http://localhost:3002/api/Stands/${id}`);
      setStands(Stands.filter((Stand) => Stand._id !== id));
    } catch (error) {
      console.error("Error deleting Stand:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <form className="form" onSubmit={handleSubmit}>
        <select name="id" value={newStand.id} onChange={handleChange} required>
          <option value="" disabled>Select Stand ID</option>
          {StandIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <input name="superficie" value={newStand.superficie} onChange={handleChange} placeholder="Superficie" required />
        <input name="prix" value={newStand.prix} onChange={handleChange} placeholder="Prix" required />
        {/* <textarea name="description" value={newStand.description} onChange={handleChange} placeholder="Description" required></textarea> */}
        <button type="submit">Ajouter Stand</button>
      </form>

      <h2>Stands</h2>
      <ul className="Stands-list">
        {Stands.map((Stand) => (
          <li key={Stand.id}>
            {editingStand && editingStand.id === Stand.id ? (
              <form className="form" onSubmit={handleEditSubmit}>
                <select name="id" value={editingStand.id} onChange={handleEditChange} required disabled>
                  <option value="" disabled>Select Stand ID</option>
                  <option value={Stand.id}>{Stand.id}</option>
                </select>
                <input name="superficie" value={editingStand.superficie} onChange={handleEditChange} placeholder="Superficie" required />
                <input name="prix" value={editingStand.prix} onChange={handleEditChange} placeholder="Prix" required />
                <button type="submit">Sauvegarder</button>
                <button type="button" onClick={() => setEditingStand(null)}>Annuler</button>
              </form>
            ) : (
              <>
                {Stand.numero} - {Stand.superficie} - {Stand.prix} - {Stand.description}
                <button onClick={() => setEditingStand(Stand)}>Modifier</button>
                <button onClick={() => handleDelete(Stand._id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
