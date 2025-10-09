import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Screens/HomePage/Home";
import Navbar from "./pages/Navbar";
import NotFound from "./pages/NotFound ";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Footer from "./utils/Footer";
import Hero from "./components/Screens/HomePage/Hero";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
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
