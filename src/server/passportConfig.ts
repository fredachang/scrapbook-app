import { PassportStatic } from "passport";
import { emailExists, createUser, matchPassword, getUserById } from "./helper";
import { Strategy as LocalStrategy } from "passport-local";

export const initialisePassport = (passport: PassportStatic) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // Add this line to pass additional parameters
      },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName } = req.body; // Retrieve firstName and lastName from the request body

          const userExists = await emailExists(email);

          if (userExists) {
            return done(null, false);
          }

          //if user doesnt exist, creates an entry in db
          const user = await createUser(email, password, firstName, lastName); // Include firstName and lastName in the createUser function call
          return done(null, user, { message: "User Created Successfully" });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          //check if email exists
          const user = await emailExists(email);
          if (!user) return done(null, false);
          //if email exists, check if password matches
          const isMatch = await matchPassword(password, user.password);
          if (!isMatch) return done(null, false);
          //if password matches, logs in the user and returns the user object
          return done(null, {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
          });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  //Serialization: Takes the user object, extracts a unique identifier (e.g., user ID), and stores it in the session.
  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user with ID:", id);
    try {
      const user = await getUserById(id);
      console.log("Deserialized user:", user);
      done(null, user);
    } catch (error) {
      console.error("Error deserializing user:", error);
      done(error, null);
    }
  });
};
