import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import Footer from "./components/Screens/common/Footer";
import Navbar from "./components/Screens/common/Navbar/Navbar";
import VerifyEmail from "./components/Auth/verifyEmail";
import UserDashboard from "./components/User/UserDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/features/auth/authSlice";
import { useRefreshTokenMutation } from "./redux/features/auth/authApi";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideNavFooter =
    location.pathname === "/admin" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-user" ||
    location.pathname === "/user/dashboard";

  const token = localStorage.getItem("token");

  // const { data, isSuccess } = useRefreshTokenQuery(undefined, {
  //   skip: !token, // only run if token exists
  // });

  const [refreshToken, { data, isSuccess }] = useRefreshTokenMutation();

  useEffect(() => {
    if (token) {
      refreshToken();
    }
  }, [token, refreshToken]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({
          user: data.user,
          roles: data.roles,
          token: data.accessToken,
        })
      );

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }
    }
  }, [isSuccess, data, dispatch]);

  return (
    <>
      {!hideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-user" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
