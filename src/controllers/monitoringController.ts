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

        console.log('findUpdateActiveMonitoring : ', findUpdateActiveMonitoring);

        const findFirstUser = await prismaClient.user_master.findFirst({
            where: {
                uuid: findUpdateActiveMonitoring.user_master_id,
            },
        });

        const findFirstTask = await prismaClient.task_master.findFirst({
            where: {
                uuid: findUpdateActiveMonitoring?.task_master_id ?? undefined,
            },
        });

        console.log('Case test : ',findUpdateActiveMonitoring?.case_master_id);

        const findFirstCase = await prismaClient.case_master.findFirst({
            where: {
                uuid: findUpdateActiveMonitoring?.case_master_id ?? undefined,
            },
        });

        const dataTrial = {
            task_master_id: findUpdateActiveMonitoring.task_master_id !== null ? findFirstTask?.task_name : null,
            case_master_id: findUpdateActiveMonitoring.case_master_id !== null ? findFirstCase?.case_name : null,
        };

        console.log('Data Trial : ',dataTrial);

        let createHistAUM = prismaClient.active_user_monitoring_hist.create({
            data: {
                active_user_monitoring_id: findUpdateActiveMonitoring.uuid,
                user_master_id: findFirstUser?.full_name,
                task_master_id: findUpdateActiveMonitoring.task_master_id !== null ? findFirstTask?.task_name : null,
                case_master_id: findUpdateActiveMonitoring.case_master_id !== null ? findFirstCase?.case_name : null,
                team_master_id: findUpdateActiveMonitoring?.team_master_id,
                remark: findUpdateActiveMonitoring.remark,
                start_time: findUpdateActiveMonitoring.start_time,
                end_time: findUpdateActiveMonitoring.end_time,
                active: findUpdateActiveMonitoring.active,
                // duration: findActiveMonitoring.duration,
                action: 'UPDATE',
                type: 'START',
                created_by : 'admin',
                created_at: now,
                updated_at: null,
                updated_by: null,
            }
        })

        console.log('Update active_user_monitoring_hist : ', createHistAUM);

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

        const findUser = await prismaClient.user_master.findFirst({
            where: {
                uuid: findUpdateActiveMonitoring?.user_master_id,
            }
        });

        const findFirstTask = await prismaClient.task_master.findFirst({
            where: {
                uuid: findUpdateActiveMonitoring?.task_master_id ?? undefined,
            },
        });

        const findFirstCase = await prismaClient.case_master.findFirst({
            where: {
                uuid: findUpdateActiveMonitoring?.case_master_id ?? undefined,
            },
        });

        // const findFirstTeam = await prismaClient.team_master.findFirst({
        //     where: {
        //         uuid: findActiveMonitoring?.team_master_id ?? undefined,
        //     }
        // });

        await prismaClient.active_user_monitoring_hist.create({
            data: {
                active_user_monitoring_id: findUpdateActiveMonitoring.uuid,
                user_master_id: findUser?.full_name,
                task_master_id: findUpdateActiveMonitoring?.task_master_id !== null ? findFirstTask?.task_name : null,
                case_master_id:  findUpdateActiveMonitoring?.case_master_id !== null ? findFirstCase?.case_name : null,
                team_master_id: findActiveMonitoring?.team_master_id,
                remark: findUpdateActiveMonitoring.remark,
                start_time: findUpdateActiveMonitoring.start_time,
                end_time: findUpdateActiveMonitoring.end_time,
                active: findUpdateActiveMonitoring.active,
                duration: findUpdateActiveMonitoring.duration,
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
        const {uuidTask, teamId, assignedBy, projectId, remark} = req.body;

        console.log('Remark : ',remark);

        let findUserProject = await prismaClient.user_project.findFirst({
            where: {
                user_master_id: assignedBy,
                project_master_id: projectId,
            }
        });

        if(findUserProject) {
            console.log('Project found');
        } else {
            let updateUserProject = await prismaClient.user_project.create({
                data: {
                    user_master_id : assignedBy,
                    project_master_id: projectId,
                    created_at: now,
                    created_by: 'admin'
                }
            });

            if(!updateUserProject) {
                console.log('Something wrong update project');
            }
        }

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
            let findAssign = await prismaClient.active_user_monitoring.findFirst({
                where : {
                    task_master_id: findTaskFirst?.uuid ?? null,
                    team_master_id: teamId,
                    project_master_id: projectId,
                }
            });

            if(!findAssign) {
                let createActivity = await prismaClient.active_user_monitoring.create({
                    data: {
                        user_master_id: assignedBy,
                        task_master_id: findTaskFirst?.uuid ?? null,
                        team_master_id: teamId,
                        project_master_id: projectId,
                        remark: remark,
                        active: false,
                        created_by: 'admin',
                    }
                });

                if(createActivity) {
                    return responseSend(res, 'success', 'Get monitoring assigned success', createActivity);
                } else {
                    return responseSend(res, 'error', 'Something wrong');
                }
            } else {
                let updateActivity = await prismaClient.active_user_monitoring.update({
                    where: {
                        uuid: findAssign.uuid,
                    },
                    data: {
                        user_master_id: assignedBy,
                        remark: remark,
                    }
                });

                if(updateActivity) {
                    return responseSend(res, 'success', 'Get monitoring update assigned success', createActivity);
                } else {
                    return responseSend(res, 'error', 'Something wrong');
                }
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
        const {uuidCase, teamId, assignedBy, projectId, remark} = req.body;

        console.log('Remark : ',remark);

        let findUserProject = await prismaClient.user_project.findFirst({
            where: {
                user_master_id: assignedBy,
                project_master_id: projectId,
            }
        });

        if(findUserProject) {
            console.log('Project found');
        } else {
            let updateUserProject = await prismaClient.user_project.create({
                data: {
                    user_master_id : assignedBy,
                    project_master_id: projectId,
                    created_at: now,
                    created_by: 'admin'
                }
            });

            if(!updateUserProject) {
                console.log('Something wrong update project');
            }
        }

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
            let findAssign = await prismaClient.active_user_monitoring.findFirst({
                where : {
                    case_master_id: findCaseFirst?.uuid ?? null,
                    team_master_id: teamId,
                    project_master_id: projectId,
                }
            });

            if(!findAssign) {
                let createActivity = await prismaClient.active_user_monitoring.create({
                    data: {
                        user_master_id: assignedBy,
                        case_master_id: findCaseFirst?.uuid ?? null,
                        team_master_id: teamId,
                        project_master_id: projectId,
                        remark: remark,
                        active: false,
                        created_by: 'admin',
                    }
                });

                if(createActivity) {
                    return responseSend(res, 'success', 'Success', createActivity);
                } else {
                    return responseSend(res, 'error', 'Something wrong');
                }
            } else {
                let updateActivity = await prismaClient.active_user_monitoring.update({
                    where: {
                        uuid: findAssign.uuid,
                    },
                    data: {
                        user_master_id: assignedBy,
                        remark: remark,
                    }
                });

                if(updateActivity) {
                    return responseSend(res, 'success', 'Get monitoring update assigned success', createActivity);
                } else {
                    return responseSend(res, 'error', 'Something wrong');
                }
            }


        }

    } catch (error : any) {
        console.error('Error update activity :', error);
    } finally {
        await prismaClient.$disconnect();

    }
}

export const findExistActivityAssign = async (req: Request, res: Response) => {
    try {
        const {userId, taskId, caseId, teamId, projectId} = req.body;

        let findAssign = await prismaClient.active_user_monitoring.findFirst({
            where : {
                user_master_id: userId,
                task_master_id: taskId,
                case_master_id: caseId,
                team_master_id: teamId,
                project_master_id: projectId,
            }
        });

        if(findAssign) {
            return responseSend(res, 'error', 'Activity Found');
        } else {
            return responseSend(res, 'success', 'Activity not found');
        }


    } catch (error) {
        console.log('Something wrong');
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

export const getMonitoringHistTeam = async (req: Request, res: Response) => {
    try {
        const {teamId} = req.body;

        let response = await prismaClient.active_user_monitoring_hist.findMany({
            where: {
                team_master_id : teamId,
                type: 'END',
            },
        });

        if(response) {
            return responseSend(res, 'success', 'Get monitoring team success', response);
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.error('Error update activity :', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const getMonitoringHistUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;

        let findUserName = await prismaClient.user_master.findFirst({
            where: {
                uuid: userId,
            }
        });

        let response = await prismaClient.active_user_monitoring_hist.findMany({
            where: {
                user_master_id : findUserName?.full_name,
                type: 'END',
            },
        });

        if(response) {
            return responseSend(res, 'success', 'Get monitoring user success', response);
        } else {
            return responseSend(res, 'error', 'Something wrong');
        }
    } catch (error) {
        console.error('Error update activity :', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const sumDurationTaskUserId = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;

        let responseSumTask = await prismaClient.active_user_monitoring_hist.aggregate({
            where: {
                user_master_id: userId,
                task_master_id: {
                    not: null,
                },
                // case_master_id: null,
            },
            _sum: {
                duration: true,
            }
        });

        let responseSumCase = await prismaClient.active_user_monitoring_hist.aggregate({
            where: {
                user_master_id: userId,
                case_master_id: {
                    not: null,
                },
                // task_master_id: null,
            },
            _sum: {
                duration: true,
            }
        });

        const sumTask = responseSumTask._sum.duration ?? 0;
        const sumCase = responseSumCase._sum.duration ?? 0;

        let dataRes = {
            sumTask : sumTask,
            sumCase: sumCase,
        };

        return responseSend(res, 'success', 'Get Sum success', dataRes);
    } catch (error) {
        console.error('Error get duration :', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const sumCountTaskCase = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;

        let responseSumTask = await prismaClient.active_user_monitoring.count({
            where: {
                user_master_id: userId,
                // task_master_id: null,
                case_master_id: null,
            },
        });

        let responseSumCase = await prismaClient.active_user_monitoring.count({
            where: {
                user_master_id: userId,
                // case_master_id: null,
                task_master_id: null,
            },
        });

        const sumTask = responseSumTask ?? 0;
        const sumCase = responseSumCase ?? 0;

        let dataRes = {
            sumTask : sumTask,
            sumCase: sumCase,
        };

        return responseSend(res, 'success', 'Get Sum success', dataRes);
    } catch (error) {
        console.error('Error get duration :', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const sumCountUserProject = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;

        let countProject = await prismaClient.user_project.count({
            where: {
                user_master_id: userId,
            }
        });

        console.log('User Project : ', countProject);

        let dateRes = {
            countProjectData: countProject,
        }

        return responseSend(res, 'success', 'Get Count Project Success', dateRes);

    } catch (error) {
        console.error('Error get project :', error);
    } finally {
        await prismaClient.$disconnect();
    }
}