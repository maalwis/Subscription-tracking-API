import Subscription from '../models/subscription.model.js'


export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });


        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}
// get subscription by user Id
export const getUserSubscriptions = async (req, res, next) => {
    try {
        console.log(req.user.id);
        console.log(req.params.id);
        // Check if the user is the same as the one in the token
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

// Get all subscriptions (could be admin-only; here we require authentication)
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// Get a single subscription by its ID
export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        // Ensure the user owns this subscription
        if (subscription.user.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ success: false, message: 'Unauthorized access' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

// Update an existing subscription
export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        // Check if the authenticated user owns the subscription
        if (subscription.user.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ success: false, message: 'Unauthorized access' });
        }
        // Update allowed fields
        Object.assign(subscription, req.body);
        await subscription.save();
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

// Delete a subscription
export const deleteSubscription = async (req, res, next) => {
    console.log(req.params.id)
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        // Verify ownership
        if (subscription.user.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ success: false, message: 'Unauthorized access' });
        }
        await subscription.remove();
        res
            .status(200)
            .json({ success: true, message: 'Subscription deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Cancel a subscription (mark its status as "cancelled")
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res
                .status(404)
                .json({ success: false, message: 'Subscription not found' });
        }
        // Ensure the user owns the subscription
        if (subscription.user.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ success: false, message: 'Unauthorized access' });
        }
        subscription.status = 'cancelled';
        await subscription.save();
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

// Get subscriptions with upcoming renewals (within next 7 days)
export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const subscriptions = await Subscription.find({
            renewalDate: {
                $gte: today,
                $lte: nextWeek,
            },
            status: 'active',
        });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};