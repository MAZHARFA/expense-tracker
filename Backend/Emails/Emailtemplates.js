"use strict";
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Inter', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(to right, #6366f1, #3b82f6); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333;">
              <p style="margin: 0 0 16px;"HEY,</p>
              <p style="margin: 0 0 16px;">Thanks for signing up! Please use the following code to verify your email address:</p>

              <div style="margin: 30px 0; text-align: center;">
                <span style="display: inline-block; padding: 15px 30px; background-color: #6366f1; color: white; font-size: 28px; font-weight: bold; letter-spacing: 4px; border-radius: 8px;">
                  {verificationCode}
                </span>
              </div>

              <p style="margin: 0 0 16px;">This code will expire in 15 minutes.</p>
              <p style="margin: 0 0 16px;">If you didn't request this, you can safely ignore this email.</p>
              <p style="margin: 0;">Best regards,<br/>Expense Tracker App</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f0f0f0; font-size: 12px; color: #999999;">
              <p style="margin: 0;">This is an automated message. Please do not reply.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Our App</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Inter', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(to right, #10b981, #059669); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Expense Tracker App🎉</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333;">
              <p style="margin: 0 0 16px;">HEY,</p>
              <p style="margin: 0 0 16px;">
                We're excited to have you on board! You've successfully signed up for <strong>Expense Tracker</strong>.
              </p>
              <p style="margin: 0 0 16px;">
                Here are some things you can do to get started:
              </p>

              <ul style="margin: 0 0 20px; padding-left: 20px;">
                <li>Explore features in your dashboard</li>
                <li>Set up your profile</li>
                <li>Connect with your team</li>
              </ul>

            

              <p style="margin: 0;">Cheers,<br/>Expense Tracker App</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f0f0f0; font-size: 12px; color: #999999;">
              <p style="margin: 0;">You received this email because you signed up for Our App.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Successful</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Inter', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(to right, #22c55e, #16a34a); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Password Reset Successful</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333;">
              <p style="margin: 0 0 16px;">HEY,</p>
              <p style="margin: 0 0 16px;">This is to confirm that your password has been successfully reset.</p>

              <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #22c55e; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
                  ✓
                </div>
              </div>


              <p style="margin: 20px 0 10px;">To enhance your security:</p>
              <ul style="margin: 0 0 16px; padding-left: 20px;">
                <li>Use a strong, unique password</li>
                <li>Enable two-factor authentication</li>
                <li>Avoid reusing passwords across sites</li>
              </ul>

              <p style="margin: 0;">Thanks for helping us keep your account secure.</p>
              <p style="margin: 16px 0 0;">Best regards,<br/>Expense Tracker App</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f0f0f0; font-size: 12px; color: #999999;">
              <p style="margin: 0;">This is an automated message. Please do not reply.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Expense Tracker App</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

