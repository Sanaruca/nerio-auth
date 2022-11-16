import passport from "passport";
import GoogleTokenStrategy from "passport-google-id-token";
import { User } from "../database/models/user-model";
import { env } from 'node:process'

passport.use(
  "google-id-token",
  new GoogleTokenStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID!,
        
    },
    async function (parsedToken, googleId, done) {

      try {

        const user = new User({
          email: parsedToken.payload.email,
          googleId,
          family_name: parsedToken.payload.family_name,
          given_name : parsedToken.payload.given_name
        })

        let  userDB = await User.findOne({googleId})

        if (!userDB) userDB = await user.save()
  
  
        done(null, userDB);
        
      } catch (error) {
        done(error, false)
      }
    }
  )
);
