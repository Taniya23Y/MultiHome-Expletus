import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
// import NavigationBar from "./pages/NavigationBar";
import NotFound from "./pages/NotFound ";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Footer from "./utils/Footer";
import Hero from "./components/Screens/HomePage/Hero";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
