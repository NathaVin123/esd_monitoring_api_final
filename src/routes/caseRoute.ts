import {Router} from 'express'
import {getAllCase, getMoreCase} from "../controllers/caseController";

console.log('Case Route Init');

const caseRoute = Router()

caseRoute.post('/getMoreCase', getMoreCase)
caseRoute.get('/getAllCase', getAllCase)

export default caseRoute