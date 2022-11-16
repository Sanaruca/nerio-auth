import passport from "passport";
import { env } from 'node:process'
import {
  Strategy as GoogleOauth2Strategy,
  VerifyFunctionWithRequest,
} from "passport-google-oauth2";
import { User } from "../database/models/user-model";

import { GoogleProfile } from "../types";

const googleOauth2Verifier: VerifyFunctionWithRequest = async function (
  request,
  accessToken,
  refreshToken,
  profile: GoogleProfile,
  done
) {
  try {
    console.log("googleOauth2Verifier");
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      const userdoc = new User({
        given_name: profile.given_name,
        family_name: profile.family_name,
        email: profile.email,
        googleId: profile.id,
      });
      user = await userdoc.save();
    }

    done(null, user);
  } catch (error: any) {
    done(error);
  }
};



passport.use(
  "google-oauth2",
  new GoogleOauth2Strategy(
    {
      clientID: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "https://localhost:3080/auth/google/callback",
      passReqToCallback: true,
    },
    googleOauth2Verifier
  )
);
