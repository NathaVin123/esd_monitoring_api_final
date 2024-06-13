import {Router} from "express";

import authRoutes from "./authRoute";
import teamRoute from "./teamRoute";
import roleRoute from "./roleRoute";
import userRoutes from "./userRoute";
import statusRoutes from "./statusRoute";
import projectRoutes from "./projectRoute";
import taskRoutes from "./taskRoute";

console.log('Root Route Init');

const rootRoutes: Router = Router()

rootRoutes.use('/auth', authRoutes)
rootRoutes.use('/team', teamRoute)
rootRoutes.use('/role', roleRoute)
rootRoutes.use('/user', userRoutes)
rootRoutes.use('/status', statusRoutes)
rootRoutes.use('/project', projectRoutes)
rootRoutes.use('/task', taskRoutes)

export default rootRoutes

