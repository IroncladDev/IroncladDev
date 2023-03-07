import { validate } from "email-validator";
import nodemailer from "nodemailer";
import config from "./server.config";
import { User } from "./mongoose";
import jwt from "jsonwebtoken";
import inLineCss from "nodemailer-juice";
import { AuthError } from "application/types";

async function sendEmail({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.use("compile", inLineCss());

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: message,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Simplify an email address in order to avoid email aliasing
 * Example: 'e.m.a.i.l+discord@gmail.com' => email@gmail.com
 **/
export function simplifyEmail(str) {
  return str.replace(/(\.(?=.+@))|(\+.*(?=@))/g, "");
}

/**
 * Creates a token from the email
 */
function getToken(email) {
  return jwt.sign({ email }, process.env.JWT_TOKEN, { expiresIn: "1d" });
}

/**
 * Check an email.
 * 1. verify if it's a valid email
 * 2. simplify the email
 * 3. check if the email already exists
 *  - if yes:
 *      - return an error (the email already exists)
 *  - if no:
 *      - send the email
 *      - return that it has been successful
 */

export default function verifyEmail(email: string): Promise<{
  err: AuthError | null;
  can?: boolean;
  email?: string;
  exists?: boolean;
}> {
  return new Promise(async (resolve) => {
    if (!validate(email)) {
      return resolve({ err: AuthError.Validity });
    } else if (config.invalidEmailHosts.includes(email.split(/@/)[1])) {
      return resolve({ err: AuthError.ThreshStrike });
    }
    const newEmail = simplifyEmail(email);
    const user = await User.findOne({ email: newEmail });
    if (user) {
      return resolve({ err: null, can: true, email: newEmail, exists: true });
    } else {
      const token = `${process.env.NEXTAUTH_URL}/api/verify?token=${getToken(
        newEmail
      )}`;

      const { success, error } = await sendEmail({
        to: newEmail,
        subject: "IroncladDev - Discord Verification",
        message:
          "Hey there, thanks for joining my discord server!<br><br>Please click the following link to verify your email address and discord membership: " +
          token,
      });

      if (success) {
        resolve({ err: null, can: true, email: newEmail, exists: false });
      } else {
        console.log(error);
        resolve({ err: AuthError.CantSend });
      }
    }
  });
}
