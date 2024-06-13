import {Router} from 'express'
import {CreateUser, DeleteUser, GetAllUser, GetUserWithRole, UpdateUser} from "../controllers/userController";

const userRoutes = Router()

console.log('User Route Init');

userRoutes.post('/createUser', CreateUser)
userRoutes.post('/updateUser', UpdateUser)
userRoutes.post('/deleteUser', DeleteUser)
userRoutes.post('/getUserWithRole', GetUserWithRole)
userRoutes.get('/getAllUser', GetAllUser)


export default userRoutes;
