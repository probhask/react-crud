import {
  addUser,
  deleteUser,
  editUser,
  getListOfUser,
} from "../controller/userController";

import express from "express";

const router = express.Router();
router.get("/", getListOfUser);
router.post("/", addUser);
router.put("/", editUser);
router.delete("/", deleteUser);

export default router;
