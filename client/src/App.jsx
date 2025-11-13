import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NotFound from "./pages/NotFound ";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import Footer from "./components/Screens/common/Footer";
import Navbar from "./components/Screens/common/Navbar/Navbar";

function App() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === "/admin" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
