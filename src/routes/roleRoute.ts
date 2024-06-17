import {Router} from 'express'
import {CountRole, createRole, DeleteRole, getAllRole, getRole, UpdateRole} from "../controllers/roleController";

console.log('Role Route Init');

const roleRoutes = Router()

roleRoutes.post('/createRole', createRole)
roleRoutes.post('/getRole', getRole)
roleRoutes.get('/getAllRole', getAllRole)

roleRoutes.post('/updateRole', UpdateRole)
roleRoutes.post('/deleteRole', DeleteRole)

roleRoutes.get('/countRole', CountRole)

export default roleRoutes
