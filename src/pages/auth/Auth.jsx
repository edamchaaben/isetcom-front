import React, { useState, useContext } from 'react';
import './auth.css';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [exhibitorId, setExhibitorId] = useState('');
  const [exhibitorIdVisible, setExhibitorIdVisible] = useState(false);

  const { login } = useContext(AuthContext);

  const registerUser = async () => {
    await axios.post('http://localhost:3002/auth/register', {
      username: username,
      FullName: nom,
      email: email,
      password: password,
      Phone: phone,
      role: selectedRole,
      exhibitorId: exhibitorId // Include exhibitorId in the registration data
    });
    if (selectedRole === 'user') {
      navigate('/client'); // Redirection vers la page utilisateur
    } else if (selectedRole === 'admin') {
      navigate('/admin'); // Redirection vers la page admin
    } else {
      navigate('/'); // Redirection par défaut, par exemple, vers la page d'accueil
    }
  };

  const registerMod = () => {
    setRegister(!register);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'user') {
        navigate('/client');
      }
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    if (event.target.value === 'exhibitor') {
      setExhibitorIdVisible(true);
    } else {
      setExhibitorIdVisible(false);
    }
  };

  return (
    <div className='auth-bg'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-7'>
            <div className='card bg-secondary shadow border-0'>
              <div className='text-center pt-lg-4'>
                <div>
                  <h1>EVENTOPIA</h1>
                </div>
              </div>
              <div className='card-body px-lg-5 pt-lg-6'>
                <div className='text-center text-muted mb-4'>
                  <big>{register ? 'Inscription' : 'Connexion'}</big>
                </div>
                <form>
                  {register && (
                    <>
                      <div className='form-group'>
                        <input
                          type='text'
                          name='username'
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                          className='form-control'
                          placeholder="Entrez votre nom d'utilisateur"
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          type='text'
                          name='Full Name'
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          className='form-control'
                          placeholder='Entrez votre nom'
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          type='text'
                          name='Phone'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className='form-control'
                          placeholder='Entrez votre numéro de téléphone'
                        />
                      </div>
                      <div className='form-group'>
                        <select
                          value={selectedRole}
                          onChange={handleRoleChange}
                          className='form-control'
                        >
                          <option value='user'>Utilisateur</option>
                          <option value='admin'>Admin</option>
                          <option value='exhibitor'>Exposant</option>
                        </select>
                      </div>
                      {exhibitorIdVisible && (
                        <div className='form-group'>
                          <input
                            type='text'
                            name='exhibitorId'
                            value={exhibitorId}
                            onChange={(e) => setExhibitorId(e.target.value)}
                            className='form-control'
                            placeholder='Entrez votre ID exposant'
                          />
                        </div>
                      )}
                    </>
                  )}
                  <div className='form-group'>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='form-control'
                      placeholder="Entrez votre adresse email"
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='form-control'
                      placeholder='Entrez votre mot de passe'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={register ? registerUser : handleLogin}
                    className='btn btn-primary mt-4'
                  >
                    {register ? "S'inscrire" : 'Connexion'}
                  </button>
                </form>
                <p
                  className='text-blue-700 mt-3 cursor-pointer font-semibold underline'
                  onClick={registerMod}
                >
                  {register
                    ? "Connectez-vous ici si vous avez déjà un compte !"
                    : "Inscrivez-vous ici si vous n'avez pas de compte !"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
