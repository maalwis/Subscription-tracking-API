import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {
    createSubscription,
    getUserSubscriptions,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    getUpcomingRenewals
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// Static routes first
subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

// get subscription by user Id
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// List all subscriptions (could be restricted to admins in a real-world scenario)
subscriptionRouter.get('/', authorize, getAllSubscriptions);

// Creation route
subscriptionRouter.post('/', authorize, createSubscription);

// Dynamic routes – these require a subscription ID
subscriptionRouter.get('/:id', authorize, getSubscriptionById);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

export default subscriptionRouter;
