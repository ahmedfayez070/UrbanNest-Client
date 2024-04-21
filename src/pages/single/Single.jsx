import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import "./single.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const Single = () => {
  const post = useLoaderData();

  const [saved, setSaved] = useState(post.isSaved);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSavePost = async () => {
    if (!currentUser) navigate("/login");
    setMessage(null);
    setIsLoading(true);
    try {
      await apiRequest.post("/users/save", { postId: post.id });

      setSaved(!saved);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="single">
      <div className="details">
        <Slider images={post.images} />
        <div className="info">
          <div className="content">
            <h1>{post.title}</h1>
            <div className="address">
              <img src="/pin.png" alt="address" />
              <span>
                {post.city} , {post.address}
              </span>
            </div>
            <span className="price">$ {post.price}</span>
          </div>
          <div className="user">
            <img
              src={post.user.avatar || "/noavatar.jpg"}
              alt={post.user.username}
            />
            <span>{post.user.username}</span>
          </div>
        </div>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.postDetail.desc),
          }}
        ></p>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="box">
            <h2>General</h2>
            <div className="items column">
              <div className="item">
                <img src="/utility.png" alt="" />
                <div className="info">
                  <h3>Utilities</h3>
                  <span>
                    {post.postDetail.utilities || "Renter"} is responsible
                  </span>
                </div>
              </div>
              <div className="item">
                <img src="/pet.png" alt="" />
                <div className="info">
                  <h3>Pet Policy</h3>
                  <span>Pets {post.postDetail.pet || "Not Allowed"}</span>
                </div>
              </div>
              <div className="item">
                <img src="/fee.png" alt="" />
                <div className="info">
                  <h3>Income Policy</h3>
                  <span>
                    Must have {post.postDetail.income || "2x income"} the rent
                    in total household income
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <h2>Room Sizes</h2>
            <div className="items space-between">
              <div className="item">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="item">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} Bedroom</span>
              </div>
              <div className="item">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom} Bathroom</span>
              </div>
            </div>
          </div>
          <div className="box">
            <h2>Nearby Places</h2>
            <div className="items">
              <div className="item flex-1">
                <img src="/school.png" alt="" />
                <div className="info">
                  <h3>School</h3>
                  <span>{post.postDetail.school}m away</span>
                </div>
              </div>
              <div className="item flex-1">
                <img src="/bus.png" alt="" />
                <div className="info">
                  <h3>Bus Stop</h3>
                  <span>{post.postDetail.bus}m away</span>
                </div>
              </div>
              <div className="item flex-1">
                <img src="/restaurant.png" alt="" />
                <div className="info">
                  <h3>Restaurant</h3>
                  <span>{post.postDetail.restaurant}m away</span>
                </div>
              </div>
            </div>
          </div>
          <div className="box single-map">
            <h2>Location</h2>
            <Map items={[post]} />
          </div>
          <div className="box">
            <div className="items space-between">
              <div className="item save">
                <img src="/chat.png" alt="" />
                <span>Send A Message</span>
              </div>
              <button
                className="item save"
                onClick={handleSavePost}
                disabled={isLoading}
                style={{ backgroundColor: saved ? "#fece51" : "#fff" }}
              >
                <img src="/save.png" alt="" />
                <span>{saved ? "Place saved" : "Save the Place"}</span>
              </button>
            </div>
          </div>
          {message && (
            <span style={{ color: "red", fontSize: "14px" }}>{message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
