import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {now} from "../utils/date";

console.log('Role Controller Init');

export const createRole = async (req: Request, res: Response) => {
    try {
        const { roleName, roleDescription } = req.body;

        let role = await prismaClient.role_master.findFirst({where: {role_name: roleName}})

        if(role) {
            return responseSend(res, 'error', 'Role Already Exist');
        } else {
            console.log('Role not found, continue');
        }

        // await prismaClient.$transaction(async (prisma) => {
        const createRole = await prismaClient.role_master.create({
            data: {
                role_name : roleName,
                role_description: roleDescription,
                created_at : now,
                created_by : 'admin',
                updated_at : null,
                updated_by : null
            }
        })

        return responseSend(res,'', createRole);
        // })

    } catch (error) {
        console.log('Error creating user:', error)
        await responseSend(res, 'error', error)
    }
}

export const getRole = async (req: Request, res: Response) => {
    const {} = req.body;

    try {
        let role = await prismaClient.role_master.findMany();

        if(role) {
            return responseSend(res, 'success', 'Get Role Success', role);
        } else {
            return responseSend(res, 'error', 'Something wrong get role');
        }
    } catch (error) {
        console.log('Error get role:', error);
        await responseSend(res, 'error', error);
    }
}
