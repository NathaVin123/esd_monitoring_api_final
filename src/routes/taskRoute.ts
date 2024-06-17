import {Router} from 'express'
import {getAllTask, getMoreTask} from "../controllers/taskController";

console.log('Task Route Init');

const taskRoutes = Router()

taskRoutes.post('/getMoreTask', getMoreTask)
taskRoutes.get('/getAllTask', getAllTask)


export default taskRoutes
