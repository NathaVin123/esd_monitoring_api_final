import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import moment from "moment";

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
                active: true,
                start_time: now,
                end_time: null,
            }
        })

        let createActiveMonitoringHist = await prismaClient.active_user_monitoring_hist.create({
            data: {
                active_user_monitoring_id: findUpdateActiveMonitoring.uuid,
                user_master_id: findUpdateActiveMonitoring.user_master_id,
                task_master_id: findUpdateActiveMonitoring.task_master_id,
                case_master_id: findUpdateActiveMonitoring.case_master_id,
                remark: findUpdateActiveMonitoring.remark,
                start_time: findUpdateActiveMonitoring.start_time,
                end_time: findUpdateActiveMonitoring.end_time,
                active: findActiveMonitoring.active,
                // duration: findActiveMonitoring.duration,
                action: 'UPDATE',
                type: 'START',
                created_by : 'admin',
                created_at: now,
                updated_at: null,
                updated_by: null,
            }
        })

        // if(findUpdateActiveMonitoring) {
        //     return responseSend(res, 'success', 'Create hist monitoring success');
        // } else {
        //     return responseSend(res, 'error', 'Something wrong');
        // }

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
                duration: duration.seconds()
            }
        })

        let createActiveMonitoringHist = await prismaClient.active_user_monitoring_hist.create({
            data: {
                active_user_monitoring_id: findUpdateActiveMonitoring.uuid,
                user_master_id: findUpdateActiveMonitoring.user_master_id,
                task_master_id: findUpdateActiveMonitoring.task_master_id,
                case_master_id: findUpdateActiveMonitoring.case_master_id,
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