import {Router} from 'express'
import {createRole} from "../controllers/roleController";

console.log('Role Route Init');

const teamRoutes = Router()

teamRoutes.post('/createRole', createRole)

export default teamRoutes
