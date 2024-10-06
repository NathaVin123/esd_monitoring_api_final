import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {compareSync, hashSync} from 'bcrypt';
import {now} from "../utils/date";
import jwt, {sign} from 'jsonwebtoken';
import {JWT_SECRET} from "../env";
import multer from "multer";
import sharp from "sharp";

console.log('Auth Controller Init');

console.log('Hello');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('profilePhoto');

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
        await prismaClient.$disconnect();
    }
}

export const CheckConnectivity = async (req: Request, res: Response) => {
    try {
        return responseSend(res, '', 'Connect into the server...');
    } catch (error) {
        console.log(error);
        return responseSend(res, 'error', error);
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { nik, password } = req.body;

        let findUserNIK = await prismaClient.user_master.findFirst({
            where: { nik },
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
            }
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
        }, JWT_SECRET, { expiresIn: '2h' })

        return responseSend(res, 'success', 'Login Succesfully', {
            nik: findUserNIK.nik,
            token: token
        })

    } catch (error) {
        console.log(error);
        return responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const RegisterUser = async (req: Request, res: Response) => {

    console.log('Register User Init');

    upload(req, res, async (err: any) => {
        if(err) {
            return responseSend(res, 'error', 'Error uploading file');
        }
        try {
            console.log(req.file?.buffer);
            const { roleId, teamId, nik, email, fullName, gender, password, activeUser, createdBy } = req.body;

            // const profilePhoto = req.file ? req.file.buffer : null;

            let profilePhoto: Buffer | null = null;
            if (req.file) {
                profilePhoto = await sharp(req.file.buffer)
                    .resize(200, 200) // Resize to 200x200 pixels
                    .jpeg({ quality: 50 }) // Compress to 80% quality
                    .toBuffer();
            }

            let alreadyRegister = await prismaClient.user_master.findFirst({where: {email}})

            console.log(alreadyRegister);

            if(alreadyRegister) {
                return responseSend(res, 'error', 'User Already Exist!');
            }

            console.log('Init Create User');

            console.log(req.body);

            const createUser = await prismaClient.user_master.create({
                data: {
                    role_master_id: roleId,
                    team_master_id : teamId,
                    nik : nik,
                    email : email,
                    full_name : fullName,
                    password: hashSync(password, 10),
                    gender : gender,
                    active_user : activeUser === 'true',
                    profile_photo: profilePhoto,
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
        } finally {
            await prismaClient.$disconnect();
        }
    });
}


