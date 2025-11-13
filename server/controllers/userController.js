const users = require("../data/users");
const jwt = require("jsonwebtoken");

const SECRET = "multihome_secret";

// Generate token
const generateToken = (id) => jwt.sign({ id }, SECRET, { expiresIn: "2h" });

// Register User
const registrationUser = (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((u) => u.email === email);
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: "User",
    isActive: false,
    profileImage: "https://via.placeholder.com/100",
    token: null,
  };

  users.push(newUser);
  res.status(201).json({
    message: "User registered. Please activate your account.",
    user: newUser,
  });
};

// Activate User
const activateUser = (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isActive = true;
  res.json({ message: "Account activated successfully" });
};

// Login
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  if (!user.isActive)
    return res.status(403).json({ message: "Account not activated" });

  const token = generateToken(user.id);
  user.token = token;

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

// Logout
const logoutUser = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (user) user.token = null;
  res.json({ message: "Logged out successfully" });
};

// Update Access Token
const updateAccessToken = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const newToken = generateToken(user.id);
  user.token = newToken;
  res.json({ message: "Token refreshed", token: newToken });
};

// Get Logged-in User Info
const getUserInfo = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Social Auth (Dummy)
const socialAuth = (req, res) => {
  const { name, email, provider } = req.body;

  let user = users.find((u) => u.email === email);
  if (!user) {
    user = {
      id: users.length + 1,
      name,
      email,
      role: "User",
      provider,
      isActive: true,
      profileImage: "https://via.placeholder.com/100",
      token: null,
    };
    users.push(user);
  }

  const token = generateToken(user.id);
  user.token = token;
  res.json({ message: `Logged in with ${provider}`, user });
};

// Update User Info
const updateUserInfo = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: "User info updated", user });
};

// Update Password
const updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = users.find((u) => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.password !== oldPassword)
    return res.status(400).json({ message: "Old password incorrect" });

  user.password = newPassword;
  res.json({ message: "Password updated successfully" });
};

// Update Profile Picture
const updateProfilePicture = (req, res) => {
  const { imageUrl } = req.body;
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.profileImage = imageUrl;
  res.json({ message: "Profile picture updated", imageUrl });
};

// Get All Users (Admin)
const getAllUsers = (req, res) => {
  res.json(users);
};

// Update User Role (Admin)
const updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = users.find((u) => u.id === Number(id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  res.json({ message: "User role updated", user });
};

// Delete User (Admin)
const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(index, 1);
  res.json({ message: "User deleted", deletedUser });
};

module.exports = {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
