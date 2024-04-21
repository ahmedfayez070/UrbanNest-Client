import { Suspense, useContext, useState } from "react";
import "./profile.scss";
import MyList from "../../components/myList/MyList";
import Chat from "../../components/chat/Chat";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const data = useLoaderData();

  const [error, setError] = useState(null);

  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="profile">
      <div className="left">
        <div className="title">
          <h1>User Information</h1>
          <Link to="/profile/update">
            <button>Update Profile</button>
          </Link>
        </div>
        <div className="info">
          <span>
            Avatar:{" "}
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt={currentUser.username}
            />
          </span>
          <span>
            Username: <b>{currentUser.username}</b>
          </span>
          <span>
            E-mail: <b>{currentUser.email}</b>
          </span>
          <button onClick={handleLogout}>Logout</button>
          {error && <span>{error}</span>}
        </div>
        <div className="title">
          <h1>My List</h1>
          <Link to="/profile/add">
            <button>Create New Post</button>
          </Link>
        </div>
        <Suspense fallback={<p>Loading ...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <MyList posts={postResponse.data.userPosts} />}
          </Await>
        </Suspense>
        <div className="title">
          <h1>Saved List</h1>
        </div>
        <Suspense fallback={<p>Loading ...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <MyList posts={postResponse.data.savedPosts} />}
          </Await>
        </Suspense>
      </div>
      <div className="right">
        <div className="wrapper">
          <Suspense fallback={<p>Loading ...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
