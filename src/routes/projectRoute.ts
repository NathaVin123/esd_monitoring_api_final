import {Router} from 'express'
import {
    createMenu,
    createProject,
    createTask,
    deleteMenu,
    deleteProject,
    deleteTask,
    editMenu,
    editTask,
    getMenu,
    getProject,
    getTask,
    updateProject
} from "../controllers/projectController";

const projectRoutes = Router()

console.log('Project Route Init');

// CRUD Project
projectRoutes.get('/getProject', getProject)
projectRoutes.post('/createProject', createProject)
projectRoutes.post('/updateProject', updateProject)
projectRoutes.delete('/deleteProject', deleteProject)

// CRUD Menu
projectRoutes.get('/getMenu', getMenu)
projectRoutes.post('/createMenu', createMenu)
projectRoutes.post('/editMenu', editMenu)
projectRoutes.delete('/deleteMenu', deleteMenu)

// CRUD Task
projectRoutes.get('/getTask', getTask)
projectRoutes.post('/createTask', createTask)
projectRoutes.post('/editTask', editTask)
projectRoutes.delete('/deleteTask', deleteTask)

// CRUD Case
projectRoutes.get('/getTask', getTask)
projectRoutes.post('/createTask', createTask)
projectRoutes.post('/editTask', editTask)
projectRoutes.delete('/deleteTask', deleteTask)



export default projectRoutes
