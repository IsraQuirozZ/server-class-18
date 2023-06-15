import express from "express";
import "dotenv/config.js";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const server = express();

// middlewares
server.use("/", express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use(errorHandler);
server.use(notFoundHandler);

export default server;
