import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Conatct/Contact";
<<<<<<< HEAD
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
=======
import AddToCardPage from "../pages/AddToCardPage/AddToCardPage";
>>>>>>> test

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
<<<<<<< HEAD
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
=======
        path: "/addToCardPage",
        element: <AddToCardPage />
      }
>>>>>>> test
    ],
  },
]);
