import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "./mapPin.scss";

const MapPin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="pop-container">
          <img src={item?.img || item?.images[0]} alt={item.title} />
          <div className="content">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} Bedrooms</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapPin;
