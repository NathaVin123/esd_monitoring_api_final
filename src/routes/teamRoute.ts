import {Router} from 'express'
import {createTeam, getAllTeam, getTeam} from "../controllers/teamController";

console.log('Team Route Init');

const teamRoutes = Router()

teamRoutes.post('/createTeam', createTeam)
teamRoutes.get('/getTeam', getTeam)
teamRoutes.get('/getAllTeam', getAllTeam)


export default teamRoutes
