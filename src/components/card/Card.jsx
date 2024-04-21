import "./card.scss";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  return (
    <div className="card">
      <Link to={`/${card.id}`} className="img-container">
        <img src={card.images[0]} alt={card.title} />
      </Link>
      <div className="text-container">
        <h2 className="title">
          <Link to={`/${card.id}`}>{card.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="address" />
          <span>{card.address}</span>
        </p>
        <p className="price">$ {card.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="beds" />
              <span>{card.bedroom} Bedrooms</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="beds" />
              <span>{card.bathroom} Bathrooms</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
