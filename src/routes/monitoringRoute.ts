import {Router} from 'express'
import {
    createActivity,
    findExistActivityAssign,
    GetAllMonitoring,
    GetAllMonitoringTeam,
    getMonitoring,
    getMonitoringHistTeam,
    getMonitoringHistUser,
    getMonitoringWithTeam,
    monitoringDone,
    sumDurationTaskUserId,
    updateActiveMonitoringEnd,
    updateActiveMonitoringStart,
    updateActivityCaseSA,
    updateActivityTaskSA
} from "../controllers/monitoringController";

console.log('Monitoring Route Init');

const MonitoringRoute = Router()

MonitoringRoute.post('/getMonitoring', getMonitoring);
MonitoringRoute.post('/updateMonitoringStart', updateActiveMonitoringStart);
MonitoringRoute.post('/updateMonitoringEnd', updateActiveMonitoringEnd);
MonitoringRoute.get('/getAllMonitoring', GetAllMonitoring);

MonitoringRoute.post('/getAllMonitoringTeam', GetAllMonitoringTeam);
MonitoringRoute.post('/getMonitoringWithTeam', getMonitoringWithTeam);

MonitoringRoute.post('/createActivity', createActivity);

MonitoringRoute.post('/updateActivityTaskSA', updateActivityTaskSA);

MonitoringRoute.post('/updateActivityCaseSA', updateActivityCaseSA);

MonitoringRoute.post('monitoringDone', monitoringDone);

MonitoringRoute.post('/getMonitoringHistTeam', getMonitoringHistTeam);

MonitoringRoute.post('/findExistActivityAssign', findExistActivityAssign);

MonitoringRoute.post('/sumDurationTaskUserId', sumDurationTaskUserId);

MonitoringRoute.post('/getMonitoringHistUser', getMonitoringHistUser);

export default MonitoringRoute