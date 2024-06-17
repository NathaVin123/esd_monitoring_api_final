import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";

console.log('Case Controller Init');

export const getMoreCase = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    console.log('Case : ',uuid);

    try {
        let findCase = await prismaClient.case_master.findMany({
            where: {
                uuid : {
                    in: uuid
                }
            }
        });

        if(findCase) {
            return responseSend(res, 'success', 'Get case Success', findCase);
        } else {
            return responseSend(res, 'error', 'Something wrong get case');
        }
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const getAllCase = async (req: Request, res: Response) => {
    const {} = req.body;

    try {
        let task = await prismaClient.case_master.findMany(
            {
                include: {
                    status: true,
                }
            }
        );

        if(task) {
            return responseSend(res, 'success', 'Get Case Success', task);
        } else {
            return responseSend(res, 'error', 'Something wrong get case');
        }
    } catch (error) {
        console.log('Error get task:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}