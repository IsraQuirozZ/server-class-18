import express from "express";
import "dotenv/config.js";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import index_router from "./router/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import inicializePassport from "./config/passport.js";

const server = express();

// middlewares
server.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_LINK,
      ttl: 10000,
    }),
  })
);
server.use("/", express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
inicializePassport();
server.use(passport.initialize());
server.use(passport.session());

// endpoints
server.use("/api", index_router);
server.use(errorHandler);
server.use(notFoundHandler);

export default server;
