import {config} from "dotenv"
config()

export const SECRET_WORD_ENV = process.env.SECRET_WORD_ENV

export const MONGO_DB_ENV = process.env.MONGO_DB_URI
export const ADMIN_EMAIL_ENV = process.env.ADMIN_EMAIL
export const SECRET_PASS_GOOGLE_ENV = process.env.SECRET_PASS_GOOGLE