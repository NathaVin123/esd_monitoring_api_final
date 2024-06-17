import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {now} from "../utils/date";

console.log('Status Controller Init');

export const CreateStatus = async (req: Request, res: Response) => {
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

export const GetStatus = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    try {
        let team = await prismaClient.status_master.findFirst({
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

export const GetAllStatus = async (req: Request, res: Response) => {

    try {
        let team = await prismaClient.status_master.findMany();

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

export const UpdateStatus = async (req: Request, res: Response) => {
    const {uuid, statusName, statusDescription} = req.body;

    try {
        let updateStatus = await prismaClient.status_master.update(
            {
                where: {
                    uuid: uuid
                },
                data: {
                    status_name: statusName,
                    status_description: statusDescription,
                    updated_by: 'admin',
                    updated_at: now,
                }
            }
        );

        if(updateStatus) {
            return responseSend(res, 'success', 'Update Status Success', updateStatus);
        } else {
            return responseSend(res, 'error', 'Something wrong update team');
        }

    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const DeleteStatus = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    try {
        let deleteTeam = await prismaClient.status_master.delete(
            {
                where: {
                    uuid: uuid
                }
            }
        );

        if(deleteTeam) {
            return responseSend(res, 'success', 'Delete Team Success', deleteTeam);
        } else {
            return responseSend(res, 'error', 'Something wrong delete team');
        }

    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const CountStatus = async (req: Request, res: Response) => {
    try {
        let countStatus = await prismaClient.status_master.count({})

        if(countStatus === 0) {
            return res.status(500).json({
                success: false,
                message: 'Status empty',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Count status found successfully',
            data: countStatus,
        });

    } catch (error) {
        console.log('Error get status : ', error);
        await responseSend(res, 'error', error);
    }
}
