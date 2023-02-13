import express from "express";
import {
  changePassword,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  signIn,
  updateUser,
} from "../controllers/user";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/sign-in", signIn);
router.get("/get-user/:id", getUser);
router.get("/get-all-user", getAllUsers);
router.delete("/delete-user/:id", deleteUser);
router.post("/update-user/:id", updateUser);
router.post("/change-password/:id", changePassword);

export default router;
