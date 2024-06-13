import {Router} from 'express'
import {CreateTeam, DeleteTeam, GetAllTeam, GetTeam, UpdateTeam} from "../controllers/teamController";

console.log('Team Route Init');

const teamRoutes = Router()

teamRoutes.post('/createTeam', CreateTeam)
teamRoutes.post('/getTeam', GetTeam)
teamRoutes.get('/getAllTeam', GetAllTeam)

teamRoutes.post('/updateTeam', UpdateTeam)
teamRoutes.post('/deleteTeam', DeleteTeam)

export default teamRoutes
