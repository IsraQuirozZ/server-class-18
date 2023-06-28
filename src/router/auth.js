import { Router } from "express";
import validator from "../middlewares/validator.js";
import passwordValidator from "../middlewares/passwordValidator.js";
import createHash from "../middlewares/createHash.js";
import isPasswordValid from "../middlewares/isPasswordValid.js";
import passport from "passport";

const auth_router = Router();

// GITHUB REGISTER
auth_router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

auth_router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/auth/fail-register-github",
  }),
  (req, res) => {
    res.status(200).redirect("/");
  }
);

auth_router.get("fail-register-github", (req, res) => {
  res.status(403).json({
    success: false,
    response: "auth error",
  });
});

// REGISTER
auth_router.post(
  "/register",
  validator,
  passwordValidator,
  createHash,
  passport.authenticate(
    "register", // nombre de la estrategia a buscar
    { failureRedirect: "/api/auth/fail-register" } // objeto de configuración de la ruta
  ),
  (req, res) => {
    return res.status(201).json({
      success: true,
      response: "user created",
    });
  }
);

auth_router.get("/fail-register", (req, res) => {
  res.status(400).json({
    success: false,
    response: "auth error",
  });
});

// LOGIN
auth_router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "api/auth/fail-login" }),
  isPasswordValid,
  (req, res, next) => {
    try {
      const { email } = req.body;
      req.session.email = email;
      req.session.role = req.user.role;
      return res.status(200).json({
        succes: true,
        response: "user signed in",
      });
    } catch (error) {
      next(error);
    }
  }
);
auth_router.get("/fail-login", (req, res) => {
  res.status(400).json({
    success: false,
    response: "auth error",
  });
});

// LOGOUT
auth_router.post("/logout", async (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({
      succes: true,
      response: "user logged out!",
    });
  } catch (error) {
    next(error);
  }
});

export default auth_router;
