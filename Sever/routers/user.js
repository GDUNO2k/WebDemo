import express from "express";
import { createUser, signIn } from "../controllers/user";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/sign-in", signIn);

export default router;
