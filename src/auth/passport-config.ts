import passport from "passport";

passport.serializeUser(function (user, done) {
  // console.log("-------------------------------");
  // console.log("passport.serializeUser");
  // console.log("-------------------------------");
  done(null, (user as any)._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    // console.log("-------------------------------");
    // console.log("passport.deserializeUser");
    // console.log("-------------------------------");

    const user = { _id: "nose" };

    if (!user) {
      return done({ message: "user not found" }, false);
    }

    done(null, user);
  } catch (error: any) {
    done(error);
  }
});