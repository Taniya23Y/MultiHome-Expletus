import React, { useState } from "react";

const SignIn = ({ setShowAuth, setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert(`Signed in with Email: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-green-400 text-white py-2 rounded-lg font-medium hover:bg-green-500 transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => setIsSignIn(false)} // 👈 this switches to SignUp
          >
            Sign Up
          </span>
        </p>
        <p
          className="text-center text-xs mt-2 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => setShowAuth(false)} // 👈 close auth form
        >
          Back to Home
        </p>
      </div>
    </div>
  );
};

export default SignIn;
