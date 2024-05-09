import { Router } from 'express'
import { LoginUser, RegisterUser, RegisterAdmin } from "../controllers/authController";

const authRoutes = Router()

console.log('Auth Route Init');

authRoutes.get('/loginUser', LoginUser)
authRoutes.post('/registerUser', RegisterUser)
authRoutes.post('/registerAdmin', RegisterAdmin)

export default authRoutes
