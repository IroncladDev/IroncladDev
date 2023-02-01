import nc from "next-connect";
import { Request, Response } from "express";
import { generateToken } from "server/lib/jwt";
import createRateLimit from "server/lib/ratelimit";

const app = nc();

app.use(createRateLimit(10 * 60 * 1000, 3));

app.post(async (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = await generateToken(
      {
        authenticated: true,
      },
      1000 * 60 * 60 * 24
    );
    console.log(token);
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        `auth=${token}; Max-Age=${1000 * 60 * 60 * 24}; path=/;`
      );
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
});

export default app;
