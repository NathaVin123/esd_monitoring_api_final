import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {hashSync} from 'bcrypt';
import {now} from "../utils/date"

console.log('User Controller Init');

export const CreateUser = async (req: Request, res: Response)=> {
    try {

        const {roleId, teamId, nik, email, fullName, password, gender, activeUser, createdBy} = req.body;

        console.log(req.body);

        console.log('Nik : '+nik);

        let findUserNIK = await prismaClient.user_master.findFirst({
            where: { nik }
        })

        console.log(findUserNIK);
        if(findUserNIK) {
            return responseSend(res, 'error', 'User Already Exist!');
        } else {
            // console.log('User not found');
        }

        const createUser = await prismaClient.user_master.create({
            data: {
                role_master_id: roleId,
                team_master_id : teamId,
                nik : nik,
                email : email,
                full_name : fullName,
                password: hashSync(password, 10),
                gender : gender,
                active_user : activeUser,
                darkmode_enabled : true,
                notification_enabled : true,
                session : null,
                created_at : now,
                created_by : createdBy,
                updated_at : null,
                updated_by : null
            }
        })
        console.log(createUser)

        return responseSend(res, 'success', 'Create user successfully');

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}

export const GetUserWithRole = async (req: Request, res: Response) => {
    try {
        const {nik} = req.body;

        let findUser = await prismaClient.user_master.findUnique({
            where: {
                nik: nik,
            },
            include: {
                role: true,
                team: true,
            }
        })

        console.log(findUser);

        return responseSend(res, 'success', 'Get User Success', findUser);

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}

export const GetAllUser = async (req: Request, res: Response) => {
    try {
        // const {nik} = req.body;

        let findUserAll = await prismaClient.user_master.findMany({
            include: {
                role: true,
                team: true,
            }
        });

        console.log(findUserAll);

        return responseSend(res, 'success', 'Get User Success', findUserAll);

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const {nik, roleId, teamId, email, fullName, gender, activeUser} = req.body;

        console.log('Update User');

        let updateUser = await prismaClient.user_master.update({
            where: {
                nik: nik,
            },
            data: {
                role_master_id: roleId,
                team_master_id : teamId,
                nik : nik,
                email : email,
                full_name : fullName,
                gender : gender,
                active_user : activeUser,
                updated_at : now,
                updated_by : 'admin'
            },
        });

        return responseSend(res, 'success', 'Update User Success', updateUser);

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const {nik} = req.body;

        let deleteUser = await prismaClient.user_master.delete({
            where: {
                nik: nik,
            },
        });

        return responseSend(res, 'success', 'Delete User Success', deleteUser);

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}
