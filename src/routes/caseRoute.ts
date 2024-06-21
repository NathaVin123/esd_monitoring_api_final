import {Router} from 'express'
import {
    CreateCase,
    deleteCase,
    getAllCase,
    getCaseWithProjectUUID,
    getMoreCase,
    updateCase
} from "../controllers/caseController";

console.log('Case Route Init');

const caseRoute = Router()

caseRoute.post('/getMoreCase', getMoreCase)
caseRoute.get('/getAllCase', getAllCase)

caseRoute.post('/getCaseWithProjectUUID', getCaseWithProjectUUID)

caseRoute.post('/createCase', CreateCase);
caseRoute.post('/updateCase', updateCase);
caseRoute.post('/deleteCase', deleteCase);

export default caseRoute