import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.js";

const inicializePassport = () => {
  passport.serializeUser((user, done) => done(null, user._id)); // Guarda el id en una session
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });
  passport.use(
    "register",
    new Strategy(
      { passReqToCallback: true, userNameField: "email" }, //objeto de requerimientos
      async (req, userName, password, done) => {
        // función de la estrategia
        try {
          let one = await User.findOne({ email: userName }); // se complementa con la deserialización para inyectar datos
          if (!one) {
            let user = await User.create(req.body);
            return done(null, user);
          }
          return done(null, false); // este done Activa el redireccionamiento
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new Strategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let user = await User.findOne({ email: username });
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default inicializePassport;
