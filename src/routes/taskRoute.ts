import {Router} from 'express'
import {getMoreTask} from "../controllers/taskController";

console.log('Task Route Init');

const taskRoutes = Router()

taskRoutes.post('/getMoreTask', getMoreTask)

export default taskRoutes
