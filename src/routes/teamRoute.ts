import { Router } from 'express'
import { createTeam } from "../controllers/teamController";

console.log('Team Route Init');

const teamRoutes = Router()

teamRoutes.post('/createTeam', createTeam)

export default teamRoutes
