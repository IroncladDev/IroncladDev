import { validate } from "email-validator";
import nodemailer from "nodemailer";
import directTransport from "nodemailer-direct-transport";
import config from "./server.config";
import { User } from "./mongoose";
import jwt from "jsonwebtoken";

var transport = nodemailer.createTransport(
  directTransport({
    name: config.verificationEmail.split(/@/)[1],
  })
);

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

export default function verifyEmail(email) {
  return new Promise(async (resolve) => {
    if (!validate(email)) {
      return resolve({ err: "Invalid email address." });
    } else if (config.invalidEmailHosts.includes(email.split(/@/)[1])) {
      return resolve({ err: "Invalid hostname." });
    }
    const newEmail = simplifyEmail(email);
    const user = await User.findOne({ email: newEmail });
    if (user) {
      return resolve({ err: null, can: true, email: newEmail, exists: true });
    } else {
      const token = `${process.env.NEXTAUTH_URL}/api/verify?token=${getToken(
        newEmail
      )}`;

      transport.sendMail(
        {
          from: config.verificationEmail,
          to: email,
          subject: "Verify your email",
          html: config.mailHTML.replace(/\$TOKEN_LINK/g, token),
        },
        (err, data) => {
          if (err) {
            console.error("ERROR_CANT_SEND_EMAIL:", err);
            resolve({ err: "CantSend" });
          } else {
            resolve({ err: null, can: true, email: newEmail, exists: false });
          }
        }
      );
    }
  });
}
