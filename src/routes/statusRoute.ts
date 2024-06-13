import {Router} from 'express'
import {CreateStatus, DeleteStatus, GetAllStatus, GetStatus, UpdateStatus} from "../controllers/statusController";

console.log('Team Route Init');

const statusRoutes = Router()

statusRoutes.post('/createStatus', CreateStatus)
statusRoutes.post('/getStatus', GetStatus)
statusRoutes.get('/getAllStatus', GetAllStatus)

statusRoutes.post('/updateStatus', UpdateStatus)
statusRoutes.post('/deleteStatus', DeleteStatus)

export default statusRoutes
