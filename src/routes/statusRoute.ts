import {Router} from 'express'
import {
    CountStatus,
    CreateStatus,
    DeleteStatus,
    GetAllStatus,
    GetStatus,
    UpdateStatus
} from "../controllers/statusController";

console.log('Status Route Init');

const statusRoutes = Router()

statusRoutes.post('/createStatus', CreateStatus)
statusRoutes.post('/getStatus', GetStatus)
statusRoutes.get('/getAllStatus', GetAllStatus)

statusRoutes.post('/updateStatus', UpdateStatus)
statusRoutes.post('/deleteStatus', DeleteStatus)

statusRoutes.get('/countStatus', CountStatus)

export default statusRoutes
