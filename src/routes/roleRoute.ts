import {Router} from 'express'
import {createRole, getRole} from "../controllers/roleController";

console.log('Role Route Init');

const teamRoutes = Router()

teamRoutes.post('/createRole', createRole)
teamRoutes.get('/getRole', getRole)


export default teamRoutes
