import dotenv from 'dotenv'

dotenv.config({path:'.env'})

export const PORT = process.env.PORT

export const URL = process.env.URL

export const JWT_SECRET = process.env.JWT_SECRET!
