import {Router} from 'express'
import {CheckConnectivity, GetToken, LoginUser, RegisterUser} from "../controllers/authController";

const authRoutes = Router()

console.log('Auth Route Init');

authRoutes.get('/getToken', GetToken)

authRoutes.get('/checkConnectivity', CheckConnectivity)

authRoutes.post('/loginUser', LoginUser)
authRoutes.post('/registerUser', RegisterUser)

export default authRoutes
