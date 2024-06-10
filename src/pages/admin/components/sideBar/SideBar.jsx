import React, { useContext } from 'react';
import { Home, Assessment, Person, Event, ExitToApp, Store, History, Place } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import './sideBar.css';
import { AuthContext } from '../../../../context/authContext';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();
        window.location.reload(false);
        navigate('/');
        await logout();
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Tableau de bord</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Home className="sidebarIcon" />
                            <Link to="/">Accueil</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Assessment className="sidebarIcon" />
                            <Link to="/analystic">Analytique</Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Menu Rapide</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <Person className="sidebarIcon" />
                            <Link to="/utilisateur">Les utilisateurs</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Person className="sidebarIcon" />
                            <Link to="/reservation">Les réservations</Link>
                        </li>
                        <li className="sidebarListItem">
                            <History className="sidebarIcon" />
                            <Link to="/products">Les historiques</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Event className="sidebarIcon" />
                            <Link to="/event">Les événements</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Store className="sidebarIcon" />
                            <Link to="/bands">Les Stands</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Place className="sidebarIcon" />
                            <Link to="/parkManagement">Gestion des parcs</Link>
                        </li>
                    </ul>
                    <ul className="sidebarList">
                        <li className="sidebarListItem" onClick={handleLogout}>
                            <ExitToApp className="sidebarIcon" />
                            <Link to="/">Déconnexion</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
