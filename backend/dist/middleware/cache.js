"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearProductCaches = exports.cache = exports.CACHE_TTL = void 0;
const redis_1 = __importDefault(require("../config/redis"));
exports.CACHE_TTL = {
    DEFAULT: 3600,
    SHORT: 300,
    LONG: 86400,
};
const cache = (keyPrefix, ttl = exports.CACHE_TTL.DEFAULT) => {
    return async (req, res, next) => {
        try {
            let key = keyPrefix;
            if (req.params.category)
                key += `:${req.params.category}`;
            if (req.params.term)
                key += `:${req.params.term}`;
            if (req.query.page)
                key += `:${req.query.page}`;
            if (req.query.limit)
                key += `:${req.query.limit}`;
            if (req.query.sort)
                key += `:${req.query.sort}`;
            if (req.query.order)
                key += `:${req.query.order}`;
            const cachedData = await redis_1.default.get(key);
            if (cachedData)
                return res.json(JSON.parse(cachedData));
            const originalJson = res.json.bind(res);
            res.json = (body) => {
                redis_1.default
                    .setEx(key, ttl, JSON.stringify(body))
                    .catch((err) => console.error("Redis caching failed:", err));
                return originalJson(body);
            };
            next();
        }
        catch (err) {
            console.error("Redis cache middleware error:", err);
            next();
        }
    };
};
exports.cache = cache;
const clearProductCaches = async (category) => {
    try {
        await redis_1.default.del("products");
        if (category)
            await redis_1.default.del(`category:${category}`);
        const searchKeys = await redis_1.default.keys("search:*");
        if (searchKeys.length)
            await redis_1.default.del(searchKeys);
    }
    catch (err) {
        console.error("Failed to clear product caches:", err);
    }
};
exports.clearProductCaches = clearProductCaches;
