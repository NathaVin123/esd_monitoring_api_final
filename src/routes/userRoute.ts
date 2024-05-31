import {Router} from 'express'
import {CreateUser, GetAllUser, GetUserWithRole} from "../controllers/userController";

const userRoutes = Router()

console.log('User Route Init');

userRoutes.post('/createUser', CreateUser)
userRoutes.post('/getUserWithRole', GetUserWithRole)
userRoutes.get('/getAllUser', GetAllUser)


export default userRoutes;
