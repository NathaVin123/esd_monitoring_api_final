import express, {Request, Response} from 'express'
import {PrismaClient} from "@prisma/client";
import {PORT, URL_DEV_LOCAL} from './env';
import rootRoutes from "./routes/rootRoute";

const app = express()

app.use(express.json())
app.use('/api', rootRoutes)

export const prismaClient = new PrismaClient({
    log:['query']
})

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to ESD Monitoring API Powered By Express.js')
})

app.listen(PORT, () => {
    console.log(`Server run successfully in http://${URL_DEV_LOCAL}:${PORT}`)
})
