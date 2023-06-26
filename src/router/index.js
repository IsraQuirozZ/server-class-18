import { Router } from "express";
import auth_router from "./auth.js";

const index_router = Router();
index_router.use("/auth", auth_router);

export default index_router;
