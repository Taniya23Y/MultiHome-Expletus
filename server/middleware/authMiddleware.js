const jwt = require("jsonwebtoken");
const users = require("../data/users");

const SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  let token;

  // checking authorization headers coming from request
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // split the two strings
      token = req.headers.authorization.split(" ")[1];

      // verify the token
      const decoded = jwt.verify(token, SECRET);

      // finding user
      const user = users.find((u) => u.id === decoded.id);

      // if not present then
      if (!user) return res.status(401).json({ message: "User not found" });

      // now to attach the user into the request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") next();
  else res.status(403).json({ message: "Admin access only" });
};

module.exports = { protect, admin };
