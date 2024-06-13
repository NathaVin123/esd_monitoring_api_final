import {Router} from 'express'
import {getAllProject, getProject, getUserProject} from "../controllers/projectController";

const projectRoutes = Router()

console.log('Project Route Init');

// CRUD Project
projectRoutes.get('/getAllProject', getAllProject)
projectRoutes.post('/getProject', getProject)
projectRoutes.post('/getUserProject', getUserProject)

// projectRoutes.post('/createProject', createProject)
// projectRoutes.post('/updateProject', updateProject)
// projectRoutes.delete('/deleteProject', deleteProject)
//
// // CRUD Menu
// projectRoutes.get('/getMenu', getMenu)
// projectRoutes.post('/createMenu', createMenu)
// projectRoutes.post('/editMenu', editMenu)
// projectRoutes.delete('/deleteMenu', deleteMenu)
//
// // CRUD Task
// projectRoutes.get('/getTask', getTask)
// projectRoutes.post('/createTask', createTask)
// projectRoutes.post('/editTask', editTask)
// projectRoutes.delete('/deleteTask', deleteTask)
//
// // CRUD Case
// projectRoutes.get('/getTask', getTask)
// projectRoutes.post('/createTask', createTask)
// projectRoutes.post('/editTask', editTask)
// projectRoutes.delete('/deleteTask', deleteTask)



export default projectRoutes
