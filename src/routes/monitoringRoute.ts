import {Router} from 'express'
import {
    getMonitoring,
    updateActiveMonitoringEnd,
    updateActiveMonitoringStart
} from "../controllers/monitoringController";

console.log('Monitoring Route Init');

const caseRoute = Router()

caseRoute.post('/getMonitoring', getMonitoring);
caseRoute.post('/updateMonitoringStart', updateActiveMonitoringStart);
caseRoute.post('/updateMonitoringEnd', updateActiveMonitoringEnd);

export default caseRoute