import aj from '../config/arcjet.js'

const arcjetMiddleware = async (req, res, next) => {
    console.log('Arcjet middleware called');
    try {

        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({message: 'Rate limit reached'});
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({message: 'No bots allowed'});
            }
            else {
                return res.status(403).json({message: 'Access denied'});
            }
        }

        next();

    } catch (error) {
        console.log("arcjet middleware error", error)
        next(error);
    }
}

export default arcjetMiddleware;
