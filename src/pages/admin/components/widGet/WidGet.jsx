import React , {useState , useEffect} from 'react';
import "./widGet.css"; 
import axios from 'axios' ; 

const WidgetLg = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/event/all");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Événements à venir</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Événement</th> 
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Description</th> 
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
    <tr className="widgetLgTr">
    <td className="widgetLgUser">
      <img
       src={`http://localhost:3002/${event.photo}`} 
        alt=""
        className="widgetLgImg"
      />
      <span className="widgetLgName">{event.EventName}</span>
    </td>
    <td className="widgetLgDate">{event.DateDebut}</td> 
    <td className="widgetLgAmount">{event.description}</td>
    <td className="widgetLgStatus">
      
    </td>
  </tr>
          ))}
      
       
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;