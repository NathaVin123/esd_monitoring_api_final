import {Router} from 'express'
import {CreateUser, GetUserWithRole} from "../controllers/userController";

const userRoutes = Router()

console.log('User Route Init');

userRoutes.post('/createUser', CreateUser)
userRoutes.post('/getUserWithRole', GetUserWithRole)


export default userRoutes;
