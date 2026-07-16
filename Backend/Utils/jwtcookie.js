import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


const generateTokenAndSetCookie = (res, id) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("Token", token, {
    httpOnly: true,                  // prevent access via JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "Strict",              // strict cross-origin policy
    maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
  });

  return token;
};

export default generateTokenAndSetCookie;
