import {Router} from 'express';

import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";



const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
    res.send({success: true, message: "CREATE new user"});
})

userRouter.put("/:id", (req, res) => {
    res.send({success: true, message: "UPDATE the user"});
})

userRouter.delete("/:id", (req, res) => {
    res.send({success: true, message: "DELETE the user"});
})

export default userRouter;