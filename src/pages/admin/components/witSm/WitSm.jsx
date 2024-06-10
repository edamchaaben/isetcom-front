import React , {useEffect , useState} from 'react';
import { Visibility } from '@material-ui/icons'; 
import "./witSm.css";
import axios from 'axios';




const WidgetSm = () => {

const [reservations, setReservations] = useState([]);

useEffect(() => {
  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:3002/reservation');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  fetchReservations();
}, []);

console.log(reservations)

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nouvelles demandes de réservations</span>
      <ul className="widgetSmList">
        {reservations.map((reservation => (
  
        <li className="widgetSmListItem">
          <img
            src={reservation.user.photo}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{reservation.user.name}</span>
            <span className="widgetSmUserTitle">{reservation.user.email}</span>
          </div>
        </li>
        )))}
      </ul>
    </div>
  );
};

export default WidgetSm;