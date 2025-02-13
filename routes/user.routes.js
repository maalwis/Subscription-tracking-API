import {Router} from 'express';



const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send({success: true, message: "GET all users"});
})

userRouter.get("/:id", (req, res) => {
    res.send({success: true, message: "GET user details"});
})

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