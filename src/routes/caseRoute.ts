import {Router} from 'express'
import {getMoreCase} from "../controllers/caseController";

console.log('Case Route Init');

const caseRoute = Router()

caseRoute.post('/getMoreCase', getMoreCase)

export default caseRoute