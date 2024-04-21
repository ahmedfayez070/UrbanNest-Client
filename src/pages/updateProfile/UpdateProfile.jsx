import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./updateProfile.scss";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const UpdateProfile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(
    currentUser.avatar ? [currentUser.avatar] : []
  );

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const { username, password, email } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-profile">
      <div className="form-container">
        <form onSubmit={handleUpdate}>
          <h1>Update your Account</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            defaultValue={currentUser.username}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={currentUser.email}
          />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" disabled={isLoading}>
            Update
          </button>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        </form>
      </div>
      <div className="img-container">
        <img src={avatar[0] || "/noavatar.jpg"} alt="" />
        <UploadWidget
          uwConfig={{
            cloudName: "ahmedfayez",
            uploadPreset: "estate",
            multiple: false,
            folder: "estate",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
