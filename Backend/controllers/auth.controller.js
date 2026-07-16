"use strict";
import User from "../Models/usermodel.js";
import bcryptjs from "bcryptjs";

import { randomBytes } from "crypto";
import { sendWelcomeEmail } from "../Emails/EmailServices.js";

import { sendResetSuccessEmail } from "../Emails/EmailServices.js";
import { sendPasswordResetEmail } from "../Emails/EmailServices.js";

import generateTokenAndSetCookie from "../Utils/jwtcookie.js";
import { sendVerificationEmail } from "../Emails/EmailServices.js";

import upload from "../Middleware/userprofile.js";

export const signup = async (req, res) => {
  const { Name, email, password, imageUrl } = req.body;

  try {
    if (!Name || !email || !password) {
      throw new Error("All fields are required");
    }
    const userAlredyExist = await User.findOne({ email });
    if (userAlredyExist)
      return res
        .status(400)
        .json({ success: false, message: "user Alredyexist" });

    const hasdedPasssword = await bcryptjs.hash(password, 14);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      Name,
      email,
      password: hasdedPasssword,
      imageUrl,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });
   

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);
    return res.status(200).json({
      success: true,
      message: "user created successfully",

      password: undefined,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isverified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.Name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.signIn = new Date();
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.Name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("Token");
  res.status(200).json({ success: true, message: "Logout succesfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found " });
    }
    //Generate reset token

    const resetToken = randomBytes(32).toString("hex");

    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetpasswordToken = resetToken;
    user.resetpasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    //send email
    const CLIENT_URL = "http://localhost:5173";
    await sendPasswordResetEmail(
      user.email,
      `${CLIENT_URL}/new-password/?${resetToken}`
    );
    return res.status(200).json({
      success: true,
      message: "Password reset link send to the Email",
    });
  } catch (error) {
    console.log("Error forgot password", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const newPassword = async (req, res) => {
  try {
    const { Token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetpasswordToken: Token,
      resetpasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired Reset Token" });
    }

    //updated the password

    const hasdedPasssword = await bcryptjs.hash(password, 14);
    user.password = hasdedPasssword;
    user.resetpasswordToken = undefined;
    user.resetpasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);
    return res
      .status(200)
      .json({ success: false, message: " Set New Pasword  successfully" });
  } catch (error) {
    console.log("Error in Reset password:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in checkProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Image = [
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/Uploads/${
      req.file.filename
    }`;
    res.status(200).json({ imageUrl });
  },
];
