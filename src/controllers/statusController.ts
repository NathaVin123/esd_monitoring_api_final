import {Express, Request, Response} from 'express'
import {prismaClient} from "../server";
import { responseSend } from "../exceptions/errorHandling";
import { hashSync, compareSync } from 'bcrypt';
import { now } from "../utils/date";
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from "../env";

console.log('Status Controller Init');

export const createStatus = async (req: Request, res: Response) => {
    try {
        const { statusName, statusDescription } = req.body;

        let findStatus = await prismaClient.status_master.findFirst({
            where: {status_name: statusName}
        })

        if(findStatus) {
            return responseSend(res, 'error', 'Status Already Exist');
        } else {
            console.log('Status not found');
        }

        // await prismaClient.$transaction(async (prisma) => {
        const createStatus = await prismaClient.status_master.create({
            data: {
                status_name: statusName,
                status_description : statusDescription,
                created_by : 'admin',
                updated_at : null,
                updated_by : null,
            }
        })

        return responseSend(res,'', createStatus);
        // })

    } catch (error) {
        console.log('Error creating role:', error)
        await responseSend(res, 'error', error)
    }
}
