import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {now} from "../utils/date";

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

export const getTaskWithProjectUUID = async (req: Request, res: Response) => {
    console.log('Task UUID Init');

    const {projectUUID} = req.body;

    try {
        let findTask = await prismaClient.task_master.findMany(
            {
                where: {
                    project_master_id: projectUUID,
                },
                include: {
                    status: true,
                    project: true,
                    assigned_by: true,
                }
            }
        );

        if(findTask) {
            return responseSend(res, 'success', 'Get Task Success', findTask);
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

export const createTask = async (req: Request, res: Response) => {
    console.log('Create Task Init');

    try {
        const {taskName, taskDescription, projectId, statusId, startDate, endDate, progress, createdBy} = req.body;

        let createTask = await prismaClient.task_master.create({
            data: {
                task_name: taskName,
                task_description: taskDescription,
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

        if(createTask) {
            return responseSend(res, 'success', 'Create Task Success', createTask);
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

export const updateTask = async (req: Request, res: Response) => {
    try {
        const {uuid, taskName, taskDescription, statusId, startDate, endDate, progress, createdBy} = req.body;

        let updateTask = await prismaClient.task_master.update({
            where : {
                uuid: uuid
            },
            data: {
                task_name: taskName,
                task_description: taskDescription,
                status_master_id: statusId,
                start_date: startDate,
                end_date: endDate,
                progress: progress,
                updated_by: createdBy,
                updated_at: now,
            }
        })

        if(updateTask) {
            return responseSend(res, 'success', 'Update Task Success', updateTask);
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

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const {uuid} = req.body;

        let deleteTask = await prismaClient.task_master.delete({
            where: {
                uuid: uuid,
            }
        });

        if(deleteTask) {
            return responseSend(res, 'success', 'Delete Task Success', deleteTask);
        } else {
            return responseSend(res, 'error', 'Something wrong delete task');
        }
    } catch (error) {
        console.log('Error get task:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}