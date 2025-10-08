import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import NotFound from "./pages/NotFound ";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Footer from "./utils/Footer";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <Navbar setShowAuth={setShowAuth} />

      {/* Render Login/Signup only when clicked */}
      {showAuth ? (
        isSignIn ? (
          <SignIn setShowAuth={setShowAuth} setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setShowAuth={setShowAuth} setIsSignIn={setIsSignIn} />
        )
      ) : (
        <Home />
      )}

      <NotFound />
      <Footer />
    </>
  );
}

export default App;
