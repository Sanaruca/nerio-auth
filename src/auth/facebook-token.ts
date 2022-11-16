import passport from "passport";
import FacebookTokenStrategy from "passport-facebook-token";
import { User } from "../database/models/user-model";
import { env } from 'node:process'

passport.use(
  "facebook-token",
  new FacebookTokenStrategy(
    {
      clientID: env.FACEBOOK_CLIENT_ID!,
      clientSecret: env.FACEBOOK_CLIENT_SECRET!,
      fbGraphVersion: "v3.0",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = new User({
          email: profile._json.email,
          family_name: profile.name.familyName,
          given_name: profile.name.givenName,
          facebookId: profile.id,
        });

        let userDB = await User.findOne({ facebookId: profile.id });

        if (!userDB) userDB = await user.save();

        done(null, userDB);

      } catch (error) {
        done({ message: "some error" }, false);
      }
    }
  )
);
