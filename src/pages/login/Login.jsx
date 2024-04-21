import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login(username, password);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <input type="text" required placeholder="Username" name="username" />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
          />
          <button type="submit" disabled={isLoading}>
            Log in
          </button>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <Link to="/register">Don&apos;t Have an account</Link>
        </form>
      </div>
      <div className="img-container">
        <img src="/bg.png" alt="landing" />
      </div>
    </div>
  );
};

export default Login;
