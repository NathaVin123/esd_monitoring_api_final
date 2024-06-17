import {Router} from "express";

import authRoutes from "./authRoute";
import teamRoute from "./teamRoute";
import roleRoute from "./roleRoute";
import userRoutes from "./userRoute";
import statusRoutes from "./statusRoute";
import projectRoutes from "./projectRoute";
import taskRoutes from "./taskRoute";
import caseRoute from "./caseRoute";
import monitoringRoute from "./monitoringRoute";
import globalRoute from "./globalRoute";

console.log('Root Route Init');

const rootRoutes: Router = Router()

rootRoutes.use('/auth', authRoutes)
rootRoutes.use('/team', teamRoute)
rootRoutes.use('/role', roleRoute)
rootRoutes.use('/user', userRoutes)
rootRoutes.use('/status', statusRoutes)
rootRoutes.use('/project', projectRoutes)
rootRoutes.use('/task', taskRoutes)
rootRoutes.use('/case', caseRoute)
rootRoutes.use('/monitoring', monitoringRoute)
rootRoutes.use('/global', globalRoute)

export default rootRoutes

