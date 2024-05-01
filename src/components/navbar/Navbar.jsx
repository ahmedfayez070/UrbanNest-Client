import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
// import { useNotificationStore } from "../../lib/notificationStore";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // const fetch = useNotificationStore((state) => state.fetch);
  // const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>UrbanNest</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <>
            <Link to="/profile" className="user">
              <img
                src={currentUser.avatar || "/noavatar.jpg"}
                alt={currentUser.username}
              />
              <span>{currentUser.username}</span>
            </Link>
            <div className="register-btn link-profile">
              <Link to="/profile">Profile</Link>
              {/* {number > 0 && <span>{number}</span>} */}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register-btn" className="register-btn">
              Sign up
            </Link>
          </>
        )}
        <div className="menu-icon">
          <img src="/menu.png" alt="" onClick={() => setOpen(!open)} />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/">Agents</Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="user">
                <img
                  src={currentUser.avatar || "/noavatar.jpg"}
                  alt={currentUser.username}
                />
                <span>{currentUser.username}</span>
              </Link>
              <span>Log out</span>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register-btn" className="register-btn">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
