import express from "express";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth-router";
import dotenv from "dotenv";
const app = express();

// import environments
dotenv.config();


// import strategys
import "./auth/passport-config"; // ! not done
import "./auth/google-oauth2";
import "./auth/google-id-token";
import "./auth/facebook-token";

//import mongoconection
import "./database/mongo-conection";


// middlewares
app.use(cors({ origin: ["http://localhost:4200"] }));
app.use(morgan("dev"));
app.use(express.json());
// app.use(session({ secret: "cats" }));
// app.use(passport.session());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("under developing");
});

app.post<"/login", null, any, any, { googleUserId?: string }>(
  "/login",
  (req, res) => {
    res.send("under developing");
  }
);


app.use('/auth', authRouter)


export default app;