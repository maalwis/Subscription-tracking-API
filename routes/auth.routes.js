import {Router} from 'express';


const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
    res.send({success: true, message: "Sign up"});
})

authRouter.post("/sign-in", (req, res) => {
    res.send({success: true, message: "Sign in"});
})

authRouter.post("/sign-out", (req, res) => {
    res.send({success: true, message: "Sign out"});
})

export default authRouter;