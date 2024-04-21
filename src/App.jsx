import { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./layout.scss";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import AddPost from "./pages/addPost/AddPost";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const { currentUser } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <List />,
          loader: listPageLoader,
        },
        {
          path: "/login",
          element: currentUser ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/register",
          element: currentUser ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "/profile/update",
          element: !currentUser ? <Navigate to="/login" /> : <UpdateProfile />,
        },
        {
          path: "/profile/add",
          element: !currentUser ? <Navigate to="/login" /> : <AddPost />,
        },
        {
          path: "/profile",
          element: !currentUser ? <Navigate to="/login" /> : <Profile />,
          loader: profilePageLoader,
        },
        {
          path: "/:id",
          element: <Single />,
          loader: singlePageLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
