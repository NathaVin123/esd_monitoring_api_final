import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {now} from "../utils/date";

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

export const getCaseWithProjectUUID = async (req: Request, res: Response) => {
    console.log('Case UUID Init');

    const {projectUUID} = req.body;

    try {
        let findCase= await prismaClient.case_master.findMany({
            where: {
                project_master_id: projectUUID,
            },
            include: {
                status: true,
                project: true,
                assigned_by: true,
            }
        });

        if(findCase) {
            return responseSend(res, 'success', 'Get Case Success', findCase);
        } else {
            return responseSend(res, 'error', 'Something wrong get case');
        }

    } catch (error) {
        console.log('Error get case:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();

    }
}

export const CreateCase = async (req: Request, res: Response) => {
    console.log('Create Case Init');

    try {
        const {caseName, caseDescription, projectId, statusId, startDate, endDate, progress, createdBy} = req.body;

        let createCase = await prismaClient.case_master.create({
            data: {
                case_name: caseName,
                case_description: caseDescription,
                project_master_id: projectId,
                status_master_id: statusId,
                start_date: startDate,
                end_date: endDate,
                progress: progress,
                created_by: createdBy,
                created_at: now,
                updated_by: null,
                updated_at: null,
            }
        });

        if(createCase) {
            return responseSend(res, 'success', 'Create Case Success', createCase);
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

export const updateCase = async (req: Request, res: Response) => {
    try {
        const {uuid, caseName, caseDescription, statusId, startDate, endDate, progress, createdBy} = req.body;

        let updateCase = await prismaClient.case_master.update({
            where : {
                uuid: uuid
            },
            data: {
                case_name: caseName,
                case_description: caseDescription,
                status_master_id: statusId,
                start_date: startDate,
                end_date: endDate,
                progress: progress,
                updated_by: createdBy,
                updated_at: now,
            }
        })

        if(updateCase) {
            return responseSend(res, 'success', 'Update case Success', updateCase);
        } else {
            return responseSend(res, 'error', 'Something wrong update case');
        }

    } catch (error) {
        console.log('Error get task:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const deleteCase = async (req: Request, res: Response) => {
    try {
        const {uuid} = req.body;

        let deleteCase = await prismaClient.case_master.delete({
            where: {
                uuid: uuid,
            }
        });

        if(deleteCase) {
            return responseSend(res, 'success', 'Delete Case Success', deleteCase);
        } else {
            return responseSend(res, 'error', 'Something wrong delete case');
        }
    } catch (error) {
        console.log('Error get task:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}