import {Router} from 'express'
import {
    CountUser,
    CreateUser,
    DeleteUser,
    GetAllUser,
    getAllUserTeam,
    GetFirstUser,
    GetFirstUserUUID,
    getUserSAOnly,
    GetUserWithRole,
    UpdateUser
} from "../controllers/userController";

const userRoutes = Router()

console.log('User Route Init');

userRoutes.post('/createUser', CreateUser)
userRoutes.post('/updateUser', UpdateUser)
userRoutes.post('/deleteUser', DeleteUser)
userRoutes.post('/getUserWithRole', GetUserWithRole)
userRoutes.get('/getAllUser', GetAllUser)

userRoutes.get('/countUser', CountUser)

userRoutes.get('/getUserSAOnly', getUserSAOnly)

userRoutes.post('/getFirstUser', GetFirstUser)

userRoutes.post('/getFirstUserUUID', GetFirstUserUUID);

userRoutes.post('/getAllUserTeam', getAllUserTeam)

export default userRoutes;
 