import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {now} from "../utils/date";

console.log('Project Controller Init');

// CRUD Project
export const getAllProject = async (req: Request, res: Response) => {
    const {} = req.body;

    try {
        let project = await prismaClient.project_master.findMany(
            {
                include: {
                    sa_leader: true,
                    status: true,
                }
            }
        );

        if(project) {
            return responseSend(res, 'success', 'Get Project Success', project);
        } else {
            return responseSend(res, 'error', 'Something wrong get project');
        }
    } catch (error) {
        console.log('Error get project:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const getAllProjectFromTeamIn = async (req: Request, res: Response) => {
    const {teamId} = req.body;

    try {
        const findProject = await prismaClient.project_master.findMany({
            where: {
                team_master_id: teamId,
            }
        });

        if(findProject) {
            return responseSend(res, 'success', 'Get Project Success', findProject);
        } else {
            return responseSend(res, 'error', 'Something wrong get project');
        }
    } catch (error) {
        console.log('Error get project:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const getAllProjectUserId = async (req: Request, res: Response) => {
    const {saLeaderId} = req.body;

    console.log('Sa Leader Id : ',saLeaderId);

    try {
        let project = await prismaClient.project_master.findMany(
            {
                where: {
                    sa_leader_id: saLeaderId,
                },
                include: {
                    sa_leader: true,
                    status: true,
                }
            }
        );

        if(project) {
            return responseSend(res, 'success', 'Get Project Success', project);
        } else {
            return responseSend(res, 'error', 'Something wrong get project');
        }
    } catch (error) {
        console.log('Error get project:', error);
        await responseSend(res, 'error', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

export const getProject = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.body;

        let findProject = await prismaClient.project_master.findFirst(
            {
                where: {uuid}
            }
        )

        if(findProject) {
            return responseSend(res, 'success', 'Get Project Success', findProject);
        } else {
            return responseSend(res, 'error', 'Something wrong get project');
        }
    } catch (error) {

    } finally {
        await prismaClient.$disconnect()
    }
}

export const getUserProject = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        let findUserProject = await prismaClient.user_project.findMany({
            where: {
                user_master_id: userId,
            },
            include: {
                project: {
                    include: {
                        team: true,
                        status: true,
                        // sa_leader: true,
                        task_master: true,
                        case_master: true,
                    }
                },
                user_id: {
                    include: {
                        role: true,
                        team: true,
                    }
                },
            },
        })

        if(findUserProject) {
            return responseSend(res, 'success', 'Get Project Success', findUserProject);
        } else {
            return responseSend(res, 'error', 'Something wrong get project');
        }
    } catch (Error : any) {
        console.log(Error.message)
    } finally {
        await prismaClient.$disconnect()
    }
}

export const createProject = async (req: Request, res: Response) => {
    try {
        const {projectTcode, projectName, projectDescription, statusId, saLeaderId, startDate, endDate, userId, teamId } = req.body;

        let project = await prismaClient.project_master.findFirst({where: {project_name: projectName}})

        if(project) {
            return responseSend(res, 'error', 'Project Already Exist');
        } else {
            console.log('Project not found, continue');
        }

        // await prismaClient.$transaction(async (prisma) => {
        const createProject = await prismaClient.project_master.create({
            data: {
                project_tcode : projectTcode,
                project_name : projectName,
                project_description: projectDescription,
                status_master_id: statusId,
                sa_leader_id: saLeaderId,
                start_date: startDate,
                end_date: endDate,
                team_master_id: teamId,
                created_at : now,
                created_by : userId,
                updated_at : null,
                updated_by : null
            }
        })

        return responseSend(res,'success', createProject);
        // })

    } catch (error) {
        console.log('Error creating user:', error)
        return responseSend(res, 'error', error)
    } finally {
        await prismaClient.$disconnect();
    }
}

// export const updateProject = async (req: Request, res: Response)=> {
//
//     try {
//         const { projectName, projectDescription, projectTcode, saleaderId, startDate, endDate, userId } = req.body;
//
//         const updateProject = await prismaClient.project_master.update({
//             where: {
//                 project_name: projectName
//             },
//             data: {
//                 project_name: projectName,
//                 project_description: projectDescription,
//                 project_tcode: projectTcode,
//                 sa_leader_id: saleaderId,
//                 start_date: startDate,
//                 end_date: endDate,
//
//                 updated_at: now,
//                 updated_by: userId,
//             }
//         })
//
//         if(!updateProject) {
//             return responseSend(res, 'error', 'Project didnt exist');
//         } else {
//             return responseSend(res, 'success', 'Project succesfully updated');
//         }
//     } catch(error) {
//         console.log('Error delete project:', error)
//         return responseSend(res, 'error', error)
//     } finally {
//         await prismaClient.$disconnect();
//     }
// }

export const updateProjectNew = async (req: Request, res: Response) => {
    try {
        const { uuid, projectName, projectDescription, projectTcode, statusId, startDate, endDate, userId} = req.body;

        console.log(req.body);

        const updateProject = await prismaClient.project_master.update({
            where: {
                uuid: uuid,
            },
            data: {
                project_name : projectName,
                project_tcode : projectTcode,
                project_description : projectDescription,
                start_date : startDate,
                end_date : endDate,
                status_master_id: statusId,
                updated_by : userId,
                updated_at: now,
            }
        });

        if(updateProject) {
            return responseSend(res, 'success', 'Project succesfully updated');
        } else {
            return responseSend(res, 'error', 'Project succesfully updated');
        }
    } catch (error) {
        console.log('Error delete project:', error)
        return responseSend(res, 'error', error)
    } finally {
        await prismaClient.$disconnect();

    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const {uuid} = req.body;

        console.log(uuid);

        let deleteProject = await prismaClient.project_master.delete({
            where: {
                uuid: uuid,
            },
        });

        if(deleteProject) {
            return responseSend(res, 'success', 'Project successfully deleted');
        } else {
            return responseSend(res, 'error', 'Something wrong deleted project');
        }

    } catch (error) {
        console.log('Error delete project:', error)
        return responseSend(res, 'error', error)
    } finally {
        await prismaClient.$disconnect();
    }
}

// export const deleteProject = async (req: Request, res: Response) => {
//     try {
//         const {projectId} = req.body;
//
//         const deleteProject = prismaClient.project_master.delete({
//             where: {
//                 uuid: projectId,
//             },
//             include: {
//                 user_project: {
//                     include: {
//                         case_master: {
//                             include: {
//                                 active_user_monitoring: true,
//                             }
//                         }
//                     }
//                 },
//                 menu_master: {
//                     include: {
//                         task_master: {
//                             include: {
//                                 active_user_monitoring: true,
//                                 case_master: {
//                                     include: {
//                                         active_user_monitoring: true,
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 },
//             }
//         });
//
//         return responseSend(res, 'success', 'Project deleted successfully!');
//     } catch (error) {
//         console.log('Error delete project:', error)
//         return responseSend(res, 'error', error)
//     } finally {
//         prismaClient.$disconnect();
//     }
// }

// CRUD Menu
// export const getMenu = async (req: Request, res: Response) => {
//     try {
//         const {} = req.body;
//
//         const menu = await prismaClient.menu_master.findMany();
//
//         if(menu) {
//             return responseSend(res, 'success', 'Get Menu Success', menu);
//         } else {
//             return responseSend(res, 'error', 'Something wrong get project');
//         }
//
//     } catch (error) {
//         console.log('Error get menu:', error);
//         await responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const createMenu = async (req: Request, res: Response) => {
//     const {menuTcode, menuName, menuDescription, projectId, userId} = req.body;
//
//     try {
//
//         const menu = await prismaClient.menu_master.findFirst({where: menuName});
//
//         if(menu) {
//             return responseSend(res, 'error', 'Menu Already Exist');
//         } else {
//             console.log('Menu not found, continue');
//         }
//
//         let createMenu = await prismaClient.menu_master.create({
//             data: {
//                 menu_tcode: menuTcode,
//                 menu_name: menuName,
//                 menu_description: menuDescription,
//                 project_master_id: projectId,
//
//                 created_at: now,
//                 created_by: userId,
//                 updated_at: null,
//                 updated_by: null,
//             }
//         });
//
//         return responseSend(res,'success', createProject);
//
//     } catch (error) {
//         console.log('Error create menu:', error);
//         await responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const editMenu = async (req: Request, res: Response) => {
//     const {menuId, menuTcode, menuName, menuDescription, projectId, userId} = req.body;
//
//     try {
//
//         const menu = await prismaClient.menu_master.update({
//                 where: {
//                     uuid: menuId,
//                 },
//                 data: {
//                     menu_tcode: menuTcode,
//                     menu_name: menuName,
//                     menu_description: menuDescription,
//                     project_master_id: projectId,
//                     updated_at: now,
//                     updated_by: userId,
//                 }
//         });
//
//         if(menu) {
//             return responseSend(res, 'error', 'Menu Already Exist');
//         } else {
//             console.log('Menu not found, continue');
//         }
//
//         return responseSend(res,'success', '');
//
//     } catch (error) {
//         console.log('Error create menu:', error);
//         await responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const deleteMenu = async (req: Request, res: Response) => {
//     try {
//         const {menuId} = req.body;
//
//         const deleteMenu = await prismaClient.menu_master.delete({
//             where: {
//                 uuid: menuId,
//             },
//             include: {
//                 task_master: {
//                     include: {
//                         active_user_monitoring: true,
//                         case_master: {
//                             include: {
//                                 active_user_monitoring: true,
//                             }
//                         }
//                     }
//                 }
//             }
//         })
//
//         return responseSend(res, 'success', 'Menu deleted successfully!');
//     } catch (error) {
//         console.log('Error delete menu:', error)
//         return responseSend(res, 'error', error)
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// // CRUD Task
// export const getTask = async (req: Request, res: Response) => {
//     try {
//         const getTask = await prismaClient.task_master.findMany();
//
//         return responseSend(res, 'success', 'Success get task', getTask);
//     } catch (error) {
//         console.log('Error create task', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const createTask = async (req: Request, res: Response) => {
//     try {
//         const {taskName, taskDescription, menuId, statusId, userId} = req.body;
//
//         let task = await prismaClient.task_master.findFirst({
//             where: {
//                 task_name: taskName,
//             }
//         });
//
//         if(task) {
//             return responseSend(res, 'error', 'Task is exist!')
//         } else {
//             console.log('Task not exist, continue');
//         }
//
//         const createtask = await prismaClient.task_master.create({
//             data: {
//                 task_name: taskName,
//                 task_description: taskDescription,
//                 menu_master_id: menuId,
//                 status_master_id: statusId,
//                 created_at: now,
//                 created_by: userId,
//             }
//         });
//
//         return responseSend(res, 'success', 'Task created successfully!');
//
//     } catch (error) {
//         console.log('Error create task', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const editTask = async (req: Request, res: Response) => {
//     try {
//         const {taskId, taskName, taskDescription, menuId, statusId, userId} = req.body;
//
//         let task = await prismaClient.task_master.update({
//             where: {
//                 uuid: taskId,
//             },
//             data: {
//                 task_name: taskName,
//                 task_description: taskDescription,
//                 menu_master_id: menuId,
//                 status_master_id: statusId,
//                 updated_at: now,
//                 updated_by: userId,
//             }
//         })
//
//         if(task) {
//             return responseSend(res, 'success', 'Task updated successfully!');
//         } else {
//             return responseSend(res, 'error', 'Task not found');
//
//         }
//
//     } catch (error) {
//         console.log('Error create task', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const deleteTask = async (req: Request, res: Response) => {
//     try {
//         const {taskId} = req.body;
//
//         const deleteTask = await prismaClient.task_master.delete({
//             where: {
//                 uuid: taskId,
//             },
//             include: {
//                 active_user_monitoring: true,
//                 case_master: {
//                     include: {
//                         active_user_monitoring: true,
//                     }
//                 }
//             }
//         });
//
//         return responseSend(res, 'success', 'Task delete succesfully!');
//
//     } catch (error) {
//         console.log('Error delete task', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// // CRUD Case
// export const getCase = async (req: Request, res: Response) => {
//     try {
//         const {} = req.body;
//         const getCase = await prismaClient.case_master.findMany();
//
//         return responseSend(res, 'success', 'Success get task', getCase);
//     } catch (error) {
//         console.log('Error get case', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const createCase = async (req: Request, res: Response) => {
//     try {
//         const {caseName, caseDescription, taskId, statusId, userProjectId, startDate, endDate, userId} = req.body;
//
//         const findCase = await prismaClient.case_master.findFirst({
//             where: {
//                 case_name: caseName,
//             },
//         })
//
//         if(findCase) {
//             return responseSend(res, 'error', 'Case is exist!');
//         } else {
//             console.log('Case not found, continue');
//         }
//
//         const createCase = await prismaClient.case_master.create({
//             data: {
//                 case_name: caseName,
//                 case_description: caseDescription,
//                 task_master_id: taskId,
//                 status_master_id: statusId,
//                 user_project_id: null,
//                 start_date: now,
//                 end_date: null,
//                 created_at: now,
//                 created_by: userId
//             }
//         });
//
//         return responseSend(res, 'success', 'Case create succesfully!');
//
//     } catch (error) {
//         console.log('Error create case', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const editCase = async (req: Request, res: Response) => {
//     try {
//         const {caseId, caseName, caseDescription, taskId, statusId, userProjectId, startDate, endDate, userId} = req.body;
//
//         const editCase = await prismaClient.case_master.update({
//            where: {
//                uuid: caseId,
//            },
//             data: {
//                case_name: caseName,
//                 case_description: caseDescription,
//                 task_master_id: taskId,
//                 status_master_id: statusId,
//                 user_project_id: userProjectId,
//                 start_date: startDate,
//                 end_date: endDate,
//             }
//         });
//
//         if(editCase) {
//             return responseSend(res, 'success', 'Edit case successfully!');
//         } else {
//             return responseSend(res, 'error', 'Case not found');
//         }
//
//     } catch (error) {
//         console.log('Error create case', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }
//
// export const deleteCase = async (req: Request, res: Response) => {
//     try {
//         const {caseId} = req.body;
//
//         const deleteCase = await prismaClient.case_master.delete({
//             where: {
//                 uuid: caseId,
//             },
//             include: {
//                 active_user_monitoring: true,
//             }
//         })
//
//         return responseSend(res, 'success', 'Delete case successfully!');
//     } catch (error) {
//         console.log('Error delete case', error);
//         return responseSend(res, 'error', error);
//     } finally {
//         prismaClient.$disconnect();
//     }
// }


