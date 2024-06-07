import {Router} from 'express'
import {createRole, getAllRole, getRole} from "../controllers/roleController";

console.log('Role Route Init');

const teamRoutes = Router()

teamRoutes.post('/createRole', createRole)
teamRoutes.get('/getRole', getRole)
teamRoutes.get('/getAllRole', getAllRole)



export default teamRoutes
