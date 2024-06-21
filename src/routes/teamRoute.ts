import {Router} from 'express'
import {
    CountTeam,
    CreateTeam,
    DeleteTeam,
    GetAllTeam,
    GetTeam,
    getTeamWithName,
    UpdateTeam
} from "../controllers/teamController";

console.log('Team Route Init');

const teamRoutes = Router()

teamRoutes.post('/createTeam', CreateTeam)
teamRoutes.post('/getTeam', GetTeam)
teamRoutes.get('/getAllTeam', GetAllTeam)
teamRoutes.post('/getTeamWithName', getTeamWithName)


teamRoutes.post('/updateTeam', UpdateTeam)
teamRoutes.post('/deleteTeam', DeleteTeam)

teamRoutes.get('/countTeam', CountTeam)

export default teamRoutes
