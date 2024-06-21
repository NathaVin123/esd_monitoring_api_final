import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import moment from "moment";
import {now} from "../utils/date";

console.log('Monitoring Controller Init');

export const getMonitoring = async (req: Request, res: Response) => {
    const {userId} = req.body;

    try {
        let findMonitoring = await prismaClient.active_user_monitoring.findMany({
            where: {
                user_master_id : userId,
            },
            include: {
                task: true,
                case: true,
                team: true,
                project: true,
            }
        });

        if(findMonitoring) {
            return responseSend(res, 'success', 'Get Monitoring Success', findMonitoring);
        } else {
            return responseSend(res, 'error', 'Something wrong get monitoring');
        }
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const updateActiveMonitoringStart = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    const now = moment().format();

    try {
        let findActiveMonitoring = await prismaClient.active_user_monitoring.findFirst({
            where: {
                uuid: uuid,
            }
        })

        if(!findActiveMonitoring) {
            return responseSend(res, 'error', 'Active Monitoring not found');
        }

        let findUpdateActiveMonitoring = await prismaClient.active_user_monitoring.update({
            where: {
                uuid: uuid,
            },
            data: {
                duration: 0,
                active: true,
                start_time: now,
                end_time: null,
            }
        })

        await prismaClient.active_user_monitoring_hist.create({
            data: {
                active_user_monitoring_id: findUpdateActiveMonitoring.uuid,
                user_master_id: findUpdateActiveMonitoring.user_master_id,
                task_master_id: findUpdateActiveMonitoring.task_master_id,
                case_master_id: findUpdateActiveMonitoring.case_master_id,
                team_master_id: findActiveMonitoring.team_master_id,
                remark: findUpdateActiveMonitoring.remark,
                start_time: findUpdateActiveMonitoring.start_time,
                end_time: findUpdateActiveMonitoring.end_time,
                active: findActiveMonitoring.active,
                duration: findActiveMonitoring.duration,
                action: 'UPDATE',
                type: 'START',

                created_by : 'admin',
                created_at: now,
                updated_at: null,
                updated_by: null,
            }
        })

        if(findUpdateActiveMonitoring) {
            return responseSend(res, 'success', 'Update monitoring success');
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const updateActiveMonitoringEnd = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    const now = moment().format();

    try {
        let findActiveMonitoring = await prismaClient.active_user_monitoring.findFirst({
            where: {
                uuid: uuid,
            }
        })

        if(!findActiveMonitoring) {
            return responseSend(res, 'error', 'Active Monitoring not found');
        }

        let findUpdateActiveMonitoringStartTime = await prismaClient.active_user_monitoring.findFirst({
            where: {
                uuid: uuid
            }
        });

// Calculate the duration
        const startTime = moment(findUpdateActiveMonitoringStartTime?.start_time);
        const duration = moment.duration(moment(now).diff(startTime));

        let findUpdateActiveMonitoring = await prismaClient.active_user_monitoring.update({
            where: {
                uuid: uuid,
            },
            data: {
                active: false,
                end_time: now,
                duration: duration.asSeconds()
            }
        })

        await prismaClient.active_user_monitoring_hist.create({
            data: {
                active_user_monitoring_id: findUpdateActiveMonitoring.uuid,
                user_master_id: findUpdateActiveMonitoring.user_master_id,
                task_master_id: findUpdateActiveMonitoring.task_master_id,
                case_master_id: findUpdateActiveMonitoring.case_master_id,
                team_master_id: findActiveMonitoring.team_master_id,
                remark: findUpdateActiveMonitoring.remark,
                start_time: findUpdateActiveMonitoring.start_time,
                end_time: findUpdateActiveMonitoring.end_time,
                active: findActiveMonitoring.active,
                duration: findActiveMonitoring.duration,
                action: 'UPDATE',
                type: 'END',
                created_by : 'admin',
                created_at: now,
                updated_at: null,
                updated_by: null,
            }
        })

        if(findUpdateActiveMonitoring) {
            return responseSend(res, 'success', 'Update monitoring success');
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const GetAllMonitoring = async (req: Request, res: Response) => {
    try {
        let findActiveMonitoring = await prismaClient.active_user_monitoring.findMany({
            include: {
                user: true,
                task: true,
                case: true,
            }
        })

        if(findActiveMonitoring) {
            return responseSend(res, 'success', 'Get all monitoring success', findActiveMonitoring);
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.error('Error get Active Monitoring:', error);
    }
}

export const GetAllMonitoringTeam = async (req: Request, res: Response) => {
    try {
        const {teamId} = req.body;

        let findMonitoringTeam = await prismaClient.active_user_monitoring.findMany({
            where: {
                user: {
                    team_master_id: teamId,
                }
            },
            // include: {
            //     // user: true,
            //     team: true,
            //     task : true,
            //     case: true,
            // }
            select: {
                uuid: true,
                start_time: true,
                end_time: true,
                remark: true,
                active: true,
                user: {
                    select: {
                        full_name: true,
                    }
                },
                team : {
                    select: {
                        team_name: true,
                    }
                },
                task : {
                    select:{
                        task_name: true,
                    }
                },
                case: {
                    select: {
                        case_name: true,
                    }
                },
            }
        });

        if(findMonitoringTeam) {
            return responseSend(res, 'success', 'Get all monitoring success', findMonitoringTeam);
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }

    } catch (error) {
        console.error('Error get Active Monitoring:', error);
    }
}

export const getMonitoringWithTeam = async (req: Request, res: Response) => {
    try {
        const {teamId} = req.body;

        console.log('getMonitoringWithTeam Init');

        console.log(teamId);

        let findMonitoring = await prismaClient.active_user_monitoring.findMany({
            where: {
                team_master_id: teamId,
            },
            include: {
                user: true,
                team: true,
                task : true,
                case: true,
            }
        });

        if(findMonitoring) {
            return responseSend(res, 'success', 'Get monitoring team success', findMonitoring);
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.error('Error get Active Monitoring:', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const createActivity = async (req: Request, res: Response) => {
    try {
        const {userId, taskId, caseId, teamId, remark} = req.body;

        let createActivity = await prismaClient.active_user_monitoring.create({
            data: {
                user_master_id: userId,
                task_master_id: taskId,
                case_master_id: caseId,
                remark: remark,
                team_master_id : teamId,
                start_time: null,
                end_time: null,
                active: false,
                created_by: 'admin',
                created_at: now,
            }
        });

        if(createActivity) {
            return responseSend(res, 'success', 'Get monitoring team success', createActivity);
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.error('Error create Active Monitoring:', error);
    } finally {
        await prismaClient.$disconnect();

    }
}

export const updateActivityTaskSA = async (req: Request, res: Response) => {
    try {
        const {uuidTask, teamId, assignedBy, projectId} = req.body;

        let updateTask = await prismaClient.task_master.update({
            where: {
                uuid : uuidTask,
            },
            data: {
                user_master_id: assignedBy,
                updated_by: 'admin',
                updated_at: now,
            }
        });

        let findTaskFirst = await prismaClient.task_master.findFirst({
            where: {
                uuid: uuidTask,
            },
        });


        if (updateTask) {
            let createActivity = await prismaClient.active_user_monitoring.create({
                data: {
                    user_master_id: assignedBy,
                    task_master_id: findTaskFirst?.uuid ?? null,
                    team_master_id: teamId,
                    project_master_id: projectId,
                    active: false,
                    created_by: 'admin',
                }
            });

            if(createActivity) {
                return responseSend(res, 'success', 'Get monitoring team success', createActivity);
            } else {
                return responseSend(res, 'error', 'Something wrong');
            }
        }

    } catch (error : any) {
        console.error('Error update activity :', error);
    } finally {
        await prismaClient.$disconnect();

    }
}

export const updateActivityCaseSA = async (req: Request, res: Response) => {
    try {
        const {uuidCase, teamId, assignedBy, projectId} = req.body;

        let updateTask = await prismaClient.case_master.update({
            where: {
                uuid : uuidCase,
            },
            data: {
                user_master_id: assignedBy,
                updated_by: 'admin',
                updated_at: now,
            }
        });

        let findCaseFirst = await prismaClient.case_master.findFirst({
            where: {
                uuid: uuidCase,
            },
        });


        if (updateTask) {
            let createActivity = await prismaClient.active_user_monitoring.create({
                data: {
                    user_master_id: assignedBy,
                    case_master_id: findCaseFirst?.uuid ?? null,
                    team_master_id: teamId,
                    project_master_id: projectId,
                    active: false,
                    created_by: 'admin',
                }
            });

            if(createActivity) {
                return responseSend(res, 'success', 'Get monitoring team success', createActivity);
            } else {
                return responseSend(res, 'error', 'Something wrong');
            }
        }

    } catch (error : any) {
        console.error('Error update activity :', error);
    } finally {
        await prismaClient.$disconnect();

    }
}

export const monitoringDone = async (req: Request, res: Response) => {
    try {
        const {uuid, taskId, caseId} = req.body;

        let updateActiveMonitoring = await prismaClient.active_user_monitoring.update({
            where : {
                uuid: uuid,
            },
            data: {
                active: false,
            }
        });

        if (updateActiveMonitoring) {
            if(taskId) {
                let updateTask = await prismaClient.task_master.update({
                    where: {
                        uuid: taskId,
                    },
                    data: {
                        progress: 100,
                    }
                });

                if(updateTask) {
                    console.log('Successfully update Task!')
                } else {
                    console.log('Error update Task!')
                }
            } else {
                let updateCase = await prismaClient.case_master.update({
                    where: {
                        uuid: caseId,
                    },
                    data : {
                        progress: 100,
                    }
                });

                if(updateCase) {
                    console.log('Successfully update Case!')
                } else {
                    console.log('Error update Case!')
                }
            }
        } else {
            console.log('Update active monitoring is not found !');
        }
    } catch (error) {
        console.error('Error update activity :', error);
    } finally {
        await prismaClient.$disconnect();
    }
}