import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";

console.log('Task Controller Init');

export const getMoreTask = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    console.log('Task :',uuid);

    try {
        let findTask = await prismaClient.task_master.findMany({
            where: {
                uuid : {
                    in: uuid
                }
            }
        });

        if(findTask) {
            return responseSend(res, 'success', 'Get Task Success', findTask);
        } else {
            return responseSend(res, 'error', 'Something wrong get task');
        }
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const getAllTask = async (req: Request, res: Response) => {
    const {} = req.body;

    try {
        let task = await prismaClient.task_master.findMany(
            {
                include: {
                    status: true,
                }
            }
        );

        if(task) {
            return responseSend(res, 'success', 'Get Task Success', task);
        } else {
            return responseSend(res, 'error', 'Something wrong get task');
        }
    } catch (error) {
        console.log('Error get task:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}