import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserResponse } from "../types";

export const handleOAuth: RequestHandler = function (req, res) {
  const user = req.user as UserResponse;

  const token = jwt.sign(
    {
      email: user.email,
    },
    "secret",
    { expiresIn: "3d" }
  );

  res.json({ token });
};
