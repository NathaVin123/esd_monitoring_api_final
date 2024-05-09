import {Express, Request, Response} from 'express'
import {prismaClient} from "../server";
import { responseSend } from "../exceptions/errorHandling";
import { hashSync, compareSync } from 'bcrypt';
import { now } from "../utils/date";
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from "../env";

console.log('Role Controller Init');

export const createRole = async (req: Request, res: Response) => {
    try {
        const { roleName, roleDescription } = req.body;

        let findRole = await prismaClient.role_master.findFirst({
            where: {role_name: roleName}
        })

        if(findRole) {
            return responseSend(res, 'error', 'Role Already Exist');
        } else {
            console.log('Role not found');
        }

        // await prismaClient.$transaction(async (prisma) => {
        const createRole = await prismaClient.team_master.create({
            data: {
                team_name: roleName,
                team_description : roleDescription,
                created_by : 'admin',
                updated_at : null,
                updated_by : null,
            }
        })

        return responseSend(res,'', createRole);
        // })

    } catch (error) {
        console.log('Error creating role:', error)
        await responseSend(res, 'error', error)
    }
}
