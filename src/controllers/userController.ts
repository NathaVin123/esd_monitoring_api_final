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

export const GetFirstUser = async (req: Request, res: Response) => {
    try {
        const {nik} = req.body;

        let findUser = await prismaClient.user_master.findFirst({
            where: {
                nik: nik
            },
            select: {
                uuid: true,
                role_master_id: true,
                team_master_id: true,
                nik: true,
                email: true,
                full_name: true,
                gender: true,
                active_user: true,
            }
        })

        if(!findUser) {
            return responseSend(res, 'error', 'User not found');
        } else {
            return responseSend(res, 'success', 'Get User Success', findUser);
        }

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}

export const GetFirstUserUUID = async (req: Request, res: Response) => {
    try {
        const {uuid} = req.body;

        let findUser = await prismaClient.user_master.findFirst({
            where: {
                uuid: uuid,
            },
            select: {
                uuid: true,
                role_master_id: true,
                team_master_id: true,
                nik: true,
                email: true,
                full_name: true,
                gender: true,
                active_user: true,
            }
        })

        if(!findUser) {
            return responseSend(res, 'error', 'User not found');
        } else {
            return responseSend(res, 'success', 'Get User Success', findUser);
        }

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    }
}

export const GetUserWithRole = async (req: Request, res: Response) => {
    try {
        const {nik, type} = req.body;

        let findUser = null;

        if(type === 'profile') {
            findUser = await prismaClient.user_master.findUnique({
                where: {
                    nik: nik,
                },
                include: {
                    role: true,
                    team: true,
                }
            })
        } else {
            findUser = await prismaClient.user_master.findUnique({
                where: {
                    nik: nik,
                },
                select: {
                    uuid: true,
                    role_master_id: true,
                    team_master_id: true,
                    nik: true,
                    email: true,
                    full_name: true,
                    password: true,
                    gender: true,
                    profile_photo: false,
                    active_user: true,
                    created_at: true,
                    created_by: true,
                    updated_at: true,
                    updated_by: true,

                    role: true,
                    team: true,
                },
            })
        }

        // let findUser = await prismaClient.user_master.findUnique({
        //     where: {
        //         nik: nik,
        //     },
        //     select: {
        //         uuid: true,
        //         role_master_id: true,
        //         team_master_id: true,
        //         nik: true,
        //         email: true,
        //         full_name: true,
        //         password: true,
        //         gender: true,
        //         profile_photo: false,
        //         active_user: true,
        //         created_at: true,
        //         created_by: true,
        //         updated_at: true,
        //         updated_by: true,
        //
        //         role: true,
        //         team: true,
        //     },
        //     // include: {
        //     //     role: true,
        //     //     team: true,
        //     // }
        // })

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
        const {nik, roleId, teamId, email, fullName, gender, activeUser, updatedBy} = req.body;

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
                updated_by : updatedBy,
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

export const CountUser = async ( req: Request, res: Response) => {
    try {
        let countTeam = await prismaClient.user_master.count({});

        if(countTeam === 0) {
            return res.status(500).json({
                success: false,
                message: 'User empty',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Count user found successfully',
            data: countTeam,
        });
    } catch (error) {
        console.log('Error get user:', error);
        await responseSend(res, 'error', error);
    }
}

export const getUserSAOnly = async (req: Request, res: Response) => {
    try {
        // const {} = req.body;
        const roleId = '454b02b0-4218-4713-ba6b-5fe5713072dc';
        let user = await prismaClient.user_master.findMany({
            where: {
                role_master_id: roleId,
            }
        })

        if(!user) {
            return responseSend(res, 'error', 'User not found');
        }

        return responseSend(res, 'success', 'Get User Success', user);

    } catch (error) {
        console.log('Error get user:', error);
        await responseSend(res, 'error', error);
    }
}

export const getAllUserTeam = async (req: Request, res: Response) => {
    try {
        console.log('Init Get User Team Init');
        const {teamId} = req.body;

        let userTeam = await prismaClient.user_master.findMany({
            where: {
                team_master_id: teamId,
            },
            select : {
                uuid: true,
                role_master_id : true,
                team_master_id: true,
                nik: true,
                email: true,
                full_name: true,
                gender: true,
                active_user: true,
            }
        });

        if(userTeam) {
            return responseSend(res, 'success', 'Get User Success', userTeam);
        } else {
            return responseSend(res, 'error', 'Somenthing wrong, userTeam');
        }
    } catch (error) {
        console.log('Error get user:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}
