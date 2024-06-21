import {Router} from 'express'
import {
    createTask,
    deleteTask,
    getAllTask,
    getMoreTask,
    getTaskWithProjectUUID,
    updateTask
} from "../controllers/taskController";

console.log('Task Route Init');

const taskRoutes = Router()

taskRoutes.post('/getMoreTask', getMoreTask)
taskRoutes.get('/getAllTask', getAllTask)

taskRoutes.post('/getTaskWithProjectUUID', getTaskWithProjectUUID)

taskRoutes.post('/createTask', createTask);
taskRoutes.post('/updateTask', updateTask);  
taskRoutes.post('/deleteTask', deleteTask);

export default taskRoutes
