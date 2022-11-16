import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { handleOAuth } from "../utilities/handle-oauth";
import { User } from "../database/models/user-model";
const authRouter = Router();


authRouter.get("/");

// facebook
authRouter.post(
  "/facebook-token",
  passport.authenticate("facebook-token", { session: false }),
  handleOAuth
);

// google

authRouter.get(
  "/google",
  passport.authenticate("google-oauth2", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google-oauth2", {
    successRedirect: "/auth/google/return",
    failureRedirect: "/not-found",
    // session: false,
    scope: ["email", "profile"],
  })
);

authRouter.get("/google/return", function (req, res) {
  if (!req.user) return res.redirect("/");

  const token = jwt.sign({ user: (req.user as any).email }, "secret", {
    expiresIn: "1d",
  });

  res.json({ token });
});


authRouter.post(
  "/google-id-token",
  passport.authenticate("google-id-token", { session: false }),
  handleOAuth
);

// token
authRouter.post("/token", async function (req, res) {
  try {
    const token = req.body.token;

    const payload = jwt.verify(token, "secret") as jwt.JwtPayload;

    if (!payload) return res.status(401).json({ message: "user not signed" });

    const user = await User.findOne({ email: payload.email });

    if (!user) return res.status(403).json({ message: "user not found" });

    res.json({
      token: jwt.sign({ user: user.email }, "secret", { expiresIn: "1d" }),
    });
  } catch (error: any) {
    res.status(500).json({ message: "internal server error", error });
  }
});

export default authRouter;
