import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    PUBLIC_PATH: env.get('PUBLIC_PATH').required().asString(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
};