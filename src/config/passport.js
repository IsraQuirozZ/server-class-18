import passport from "passport";
import { Strategy } from "passport-github2";
import GHStrategy from "passport-github2";
import User from "../models/User.js";

const { GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;
const callback = "http://localhost:8080/api/auth/github/callback";

export default function () {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });
  // passport.use(); //estrategia de registro
  // passport.use(); // estrategia de inicio de sesión
  passport.use(
    // estrategia de registro con github
    "github", // nombre de la estrategia
    new GHStrategy( //estrategia a desarrollat
      {
        clientID: GH_CLIENT_ID,
        clientSecret: GH_CLIENT_SECRET,
        callbackURL: callback,
      }, // Objeto de configuración
      // callback que depende de la respuesta de github, la propiedad más importante es profile con todos los datos del usuario de la base de datos de Githhub
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let one = await User.findOne({ email: profile._json.login }); // Los datos del usuario vienen de github
          if (one) {
            return done(null, one); // Si encuentra un usuario inyecto la propiedad req.user con los datos de user para poder directamente logearlo
          }
          let user = User.create({
            name: profile._json.name,
            email: profile._json.login,
            password: "hola1234",
            photo: profile._json.avatar_url,
          });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

// const inicializePassport = () => {
//   passport.serializeUser((user, done) => done(null, user._id)); // Guarda el id en una session
//   passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     return done(null, user);
//   });
//   passport.use(
//     "register",
//     new Strategy(
//       { passReqToCallback: true, userNameField: "email" }, //objeto de requerimientos
//       async (req, userName, password, done) => {
//         // función de la estrategia
//         try {
//           let one = await User.findOne({ email: userName }); // se complementa con la deserialización para inyectar datos
//           if (!one) {
//             let user = await User.create(req.body);
//             return done(null, user);
//           }
//           return done(null, false); // este done Activa el redireccionamiento
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
//   passport.use(
//     "login",
//     new Strategy(
//       { usernameField: "email" },
//       async (username, password, done) => {
//         try {
//           let user = await User.findOne({ email: username });
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
// };

// export default inicializePassport;
