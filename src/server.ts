import express, {Request, Response} from 'express'
import {PrismaClient} from "@prisma/client";
import {PORT, URL} from './env';
import rootRoutes from "./routes/rootRoute";
import {errorMiddleware} from "./middlewares/error";
import cors from 'cors';

const app = express()

app.use(cors());

app.use(express.json())
app.use('/api', rootRoutes)

export const prismaClient = new PrismaClient({
    errorFormat: 'minimal',
    log: ['query', 'info', 'warn', 'error'],
})

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to ESD Monitoring API Powered By Express.js')
})

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server run successfully in http://${URL}:${PORT}`)
})
