import {Router} from 'express'
import {CountAdminSummary} from "../controllers/globalController";

console.log('Global Route Init');

const globalRoute = Router()

globalRoute.get('/countAdminSummary', CountAdminSummary)

export default globalRoute