import React, { useState } from 'react';
import axios from 'axios';
import "./ajouterUtilisateur.css"

function AjouterUtilisateur() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Add state for password
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/users', {
        name,
        email,
        role,
        username,
        password // Include password in the POST request
      });
      // Clear input fields after submission
      setName('');
      setEmail('');
      setRole('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="ajouter-utilisateur">
      <h2>Ajouter Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Ajouter Utilisateur</button>
      </form>
    </div>
  );
}

export default AjouterUtilisateur;
