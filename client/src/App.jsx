import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NotFound from "./pages/NotFound ";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import Navbar from "./components/UI/Navbar/Navbar";
import Footer from "./components/Screens/common/Footer";

function App() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === "/admin" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
