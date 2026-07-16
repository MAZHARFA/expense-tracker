"use strict";
import { transporter, sender } from "./Mail.js";

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./Emailtemplates.js";
//Send mail verification
export const sendVerificationEmail = async (email, verificationToken) => {
  // const recipient = [{ email }];
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify Your's Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Verification Email sent successfully:", response.messageId);
  } catch (error) {
    console.log(`Error sending verification Email: ${error}`);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};
//Send welcome emails
export const sendWelcomeEmail = async (email, Name) => {
  // const recipient = [{ email,Name }];
  try {
    const html = `
      <h1>Welcome to Expense Tracker App</h1>
      <p>Hi ${Name}, your account has been created successfully.</p>
    `;

    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to Expense Tracker App",
      html:WELCOME_EMAIL_TEMPLATE,
    });

    console.log("Welcome Email sent successfully:", response.messageId);
  } catch (error) {
    console.log("Error sending welcome Email:", error);
    throw new Error(`Error sending welcome Email: ${error.message}`);
  }
};
//Send password Reset mails
export const sendPasswordResetEmail = async (email, resetURL) => {

  try {

    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset Your Password",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    });

    console.log("Password Reset Email sent successfully:", response.messageId);
  } catch (error) {
    console.log("Error sending password reset Email:", error);
    throw new Error(`Error sending password reset Email: ${error.message}`);
  }
};
// Mails send reset password
export const sendResetSuccessEmail = async (email) => {
 
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent successfully:", response.messageId);
  } catch (error) {
    console.log("Error sending password reset success email:", error);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};
