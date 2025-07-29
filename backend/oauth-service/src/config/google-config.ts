import { Strategy } from "passport-google-oauth20";

const googleConfig = () => {
  return new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      // Here you can handle the user profile and access token
      console.log("Google profile:", profile);
      console.log("Access Token:", accessToken);

      // You can save the user to your database here
      // For now, we will just return the profile
      return done(null, profile);
    }
  );
};

export default googleConfig;
