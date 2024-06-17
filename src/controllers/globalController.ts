import {Request, Response} from 'express'
import {prismaClient} from "../server";

console.log('Global Controller Init');

export const CountAdminSummary = async ( req: Request, res: Response) => {
    try {
        let countUser                       = await prismaClient.user_master.count({});
        let countTeam                       = await prismaClient.team_master.count({});
        let countRole                       = await prismaClient.role_master.count({});
        let countStatus                     = await prismaClient.status_master.count({});
        let countProject                    = await prismaClient.project_master.count({});
        let countTask                       = await prismaClient.task_master.count({});
        let countCase                       = await prismaClient.case_master.count({});
        let countActiveUserMonitoring       = await prismaClient.active_user_monitoring.count({});

        return res.status(200).json({
            success: true,
            message: 'Count found successfully',
            data: {
                'countUser'                     : countUser,
                'countTeam'                     : countTeam,
                'countRole'                     : countRole,
                'countStatus'                   : countStatus,
                'countProject'                  : countProject,
                'countTask'                     : countTask,
                'countCase'                     : countCase,
                'countActiveUserMonitoring'     : countActiveUserMonitoring,
            },
        });
    } catch (error) {
        console.log('Error get team:', error);
        return res.status(500).json({
            success: false,
            message: 'Error getting count : '+JSON.stringify(error),
        })
    }
}