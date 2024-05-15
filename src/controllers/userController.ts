import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {hashSync} from 'bcrypt';
import {now} from "../utils/date"

console.log('User Controller Init');

export const CreateUser = async (req: Request, res: Response)=> {
    try {

        const {roleId, teamId, nik, email, fullName, password, gender, activeUser, createdBy} = req.body;

        let findUserNIK = await prismaClient.user_master.findFirst({
            where: { nik }
        })

        console.log(findUserNIK);
        if(findUserNIK) {
            return responseSend(res, 'error', 'User Already Exist!');
        } else {
            console.log('User not found');
        }

        const createUser = await prismaClient.user_master.create({
            data: {
                role_master_id: '92c7c162-a38f-48eb-95f7-d5cb24dab534',
                team_master_id : 'd5758b8d-5882-420c-9241-2edf4e9e7451',
                nik : nik,
                email : email,
                full_name : 'admin1',
                password: hashSync(password, 10),
                gender : 'L',
                active_user : true,
                darkmode_enabled : true,
                notification_enabled : true,
                session : null,
                created_at : now,
                created_by : 'admin',
                updated_at : null,
                updated_by : null
            }
        })
        console.log(createUser)
        // res.json(createUser)

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
