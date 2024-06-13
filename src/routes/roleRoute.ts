import {Router} from 'express'
import {createRole, DeleteRole, getAllRole, getRole, UpdateRole} from "../controllers/roleController";

console.log('Role Route Init');

const teamRoutes = Router()

teamRoutes.post('/createRole', createRole)
teamRoutes.post('/getRole', getRole)
teamRoutes.get('/getAllRole', getAllRole)

teamRoutes.post('/updateRole', UpdateRole)
teamRoutes.post('/deleteRole', DeleteRole)



export default teamRoutes
