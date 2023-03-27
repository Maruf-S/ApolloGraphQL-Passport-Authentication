const jwtSecret = process.env.JWT_SECRET;
const rateLimitRequest = Number(process.env.RATE_LIMIT_REQUEST);
const rateLimitTime = Number(process.env.RATE_LIMIT_TIME);

export { jwtSecret, rateLimitRequest, rateLimitTime };
