import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {compareSync, hashSync} from 'bcrypt';
import {now} from "../utils/date";
import jwt, {sign} from 'jsonwebtoken';
import {JWT_SECRET} from "../env";
import {setCookie} from 'nookies';

console.log('Auth Controller Init');

export const GetToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }

            res.json({ message: 'Protected content', user: decoded });
        });
    } catch (error) {
        console.log(error);
        return responseSend(res, 'error', error);
    } finally {
        prismaClient.$disconnect();
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { nik, password } = req.body;

        let findUserNIK = await prismaClient.user_master.findFirst({
            where: { nik }
        })
        if(!findUserNIK)
        {
            return responseSend(res, 'error', 'NIK not exist!');
        }

        console.log(password + findUserNIK.password);

        if(!compareSync(password, findUserNIK.password)) {
            return responseSend(res, 'error', 'Incorrect password!');
        }

        const token: string = sign({
            userId: findUserNIK.uuid
        }, JWT_SECRET)

        setCookie({ res }, 'token', token, {
            httpOnly: true, // more secure, can't be accessed by JavaScript
            // secure: process.env.NODE_ENV === 'production', // use HTTPS in production
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });

        console.log(token);

        return responseSend(res, 'success', 'Login Succesfully', {
            token: token
        })

    } catch (error) {
        console.log(error);
        return responseSend(res, 'error', error);
    } finally {
        prismaClient.$disconnect();
    }
}

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { roleId, teamId, nik, email, full_name, gender, password, activeUser, session } = req.body;

        let alreadyRegister = await prismaClient.user_master.findFirst({where: {email}})

        if(alreadyRegister) {
            throw Error('User Already Exist')
        }

        // await prismaClient.$transaction(async (prisma) => {
        const createUser = await prismaClient.user_master.create({
            data: {
                role_master_id: roleId,
                team_master_id : teamId,
                nik : nik,
                email : email,
                full_name : full_name,
                password: hashSync(password, 30),
                gender : gender,
                active_user : activeUser,
                session : session,
                created_at : now,
                created_by : 'admin',
                updated_at : ''
            }
        })
        console.log(createUser)
        res.json(createUser)
    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    } finally {
        prismaClient.$disconnect();
    }
}

export const LoginAdmin = async (req: Request, res: Response) => {
    try {
        const { nik, password } = req.body;

        let findUserNIK = await prismaClient.user_master.findFirst({
            where: { nik }
        })
        if(!findUserNIK) {
            return responseSend(res, 'error', 'NIK not exist');
        }
        if(compareSync(password, findUserNIK.password)) {
            return responseSend(res, 'error', 'Incorrect password');
        }

        const token: string = sign({
            userId: findUserNIK.uuid
        }, JWT_SECRET)

        console.log('Token : ' + token);

    } catch (error) {
        console.log(error);
        return responseSend(res, 'exception', error);
    } finally {
        prismaClient.$disconnect();
    }
}

export const RegisterAdmin = async (req: Request, res: Response) => {
    try {
        const {nik, email, fullName, password } = req.body;

        let admin = await prismaClient.admin_master.findFirst({where: {email}})

        if(admin) {
            return responseSend(res, 'error', 'User Already Exist');
        } else {
            console.log('User not found');
        }

        // await prismaClient.$transaction(async (prisma) => {
            const createAdmin = await prismaClient.admin_master.create({
                data: {
                    nik : nik,
                    email : email,
                    full_name: fullName,
                    password: hashSync(password, 10),

                    created_at : now,
                    created_by : 'admin',
                    updated_at : null,
                    updated_by : null,
                }
            })

            return responseSend(res,'', createAdmin);

        } catch (error) {
            console.log('Error creating user:', error)
            await responseSend(res, 'error', error)
        }
}
