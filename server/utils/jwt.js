import jwt from "jsonwebtoken";

export const signAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const signRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      tokenVersion: user.tokenVersion,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};
