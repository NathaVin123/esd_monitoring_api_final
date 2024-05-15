import {Router} from 'express'
import {createTeam, getTeam} from "../controllers/teamController";

console.log('Team Route Init');

const teamRoutes = Router()

teamRoutes.post('/createTeam', createTeam)
teamRoutes.get('/getTeam', getTeam)


export default teamRoutes
