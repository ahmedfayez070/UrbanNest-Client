import "./register.scss";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Create An Account</h1>
          <input type="text" placeholder="Username" name="username" required />
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button disabled={isLoading} type="submit">
            Register
          </button>
          {message && <p style={{ fontSize: "14px" }}>{message}</p>}
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <Link to="/login">Have an account</Link>
        </form>
      </div>
      <div className="img-container">
        <img src="/bg.png" alt="landing" />
      </div>
    </div>
  );
};

export default Register;
