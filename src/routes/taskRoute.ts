import {Router} from 'express'
import {getTask} from "../controllers/taskController";

console.log('Team Route Init');

const taskRoutes = Router()

taskRoutes.post('/getTask', getTask)

export default taskRoutes
