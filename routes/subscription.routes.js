import {Router} from 'express';
import userRouter from "./user.routes.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({success: true, message: "GET all subscriptions"});
})

subscriptionRouter.get("/:id", (req, res) => {
    res.send({success: true, message: "GET subscription details"});
})

subscriptionRouter.post("/", (req, res) => {
    res.send({success: true, message: "CREATE subscription"});
})

subscriptionRouter.put("/:id", (req, res) => {
    res.send({success: true, message: "UPDATE subscription"});
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({success: true, message: "DELETE subscription"});
})

subscriptionRouter.get("/user/:id", (req, res) => {
    res.send({success: true, message: "GET all users subscriptions"});
})

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({success: true, message: "CANCEL subscription"});
})

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({success: true, message: "GET all upcoming renewals"});
})

export default subscriptionRouter;