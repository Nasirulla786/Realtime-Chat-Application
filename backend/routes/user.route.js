import express from "express";
import isAuth from "../middleware/isAuth.js";
import { editProfie, getCurrentUser, otherUsers } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);

userRouter.post("/editprofile", isAuth, upload.single("image"), editProfie);
userRouter.get("/otherusers", isAuth , otherUsers);

export default userRouter;
