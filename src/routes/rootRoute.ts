import { Router } from "express";

import authRoutes from "./authRoute";
import teamRoute from "./teamRoute";
import roleRoute from "./roleRoute";

console.log('Root Route Init');

const rootRoutes: Router = Router()

rootRoutes.use('/auth', authRoutes)
rootRoutes.use('/team', teamRoute)
rootRoutes.use('/role', roleRoute)


export default rootRoutes

