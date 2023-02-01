import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface ObjectAny {
  [key: string]: any;
}

export const generateToken = async (data: ObjectAny, ms: number) => {
  console.log(data, process.env.JWT_SECRET, ms);
  return await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: `${ms}ms` });
};

export const authenticateToken = (
  token: string
): Promise<ObjectAny | false> => {
  return new Promise((resolve) =>
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: Error, value: ObjectAny) => {
        if (err) resolve(false);
        else resolve(value);
      }
    )
  );
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.cookies["auth"];

  if (token) {
    const result = await authenticateToken(token);

    if (result?.authenticated) {
      req.isAuthenticated = true;
      next();
    } else {
      res.status(401).send({
        message: "Unauthorized",
        success: false,
      });
    }
  } else {
    res.status(401).send({ message: "Unauthorized", success: false });
  }
};
