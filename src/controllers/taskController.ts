import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";

console.log('Task Controller Init');

export const getTask = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    try {
        let team = await prismaClient.task_master.findFirst({
            where: {
                uuid: uuid,
            }
        });

        if(team) {
            return responseSend(res, 'success', 'Get Team Success', team);
        } else {
            return responseSend(res, 'error', 'Something wrong get team');
        }
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}