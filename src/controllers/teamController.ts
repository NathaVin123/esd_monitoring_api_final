import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";
import {now} from "../utils/date";

console.log('Team Controller Init');

export const CreateTeam = async (req: Request, res: Response) => {
    try {
        const { teamName, teamDescription } = req.body;

        let findTeam = await prismaClient.team_master.findFirst({where: {team_name: teamName}})

        if(findTeam) {
            return responseSend(res, 'error', 'Team Already Exist');
        } else {
            console.log('Team not found');
        }

        // await prismaClient.$transaction(async (prisma) => {
            const createTeam = await prismaClient.team_master.create({
                data: {
                    team_name: teamName,
                    team_description : teamDescription,
                    created_by : 'admin',
                    updated_at : null,
                    updated_by : null,
                }
            })

            return responseSend(res,'', createTeam);
        // })

    } catch (error) {
        console.log('Error creating team:', error)
        await responseSend(res, 'error', error)
    }
}

export const GetTeam = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    try {
        let team = await prismaClient.team_master.findFirst({
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

export const GetAllTeam = async (req: Request, res: Response) => {

    try {
        let team = await prismaClient.team_master.findMany();

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

export const getTeamWithName = async (req: Request, res: Response) => {
    const {name} = req.body;

    try {
        let team = await prismaClient.team_master.findFirst(
            {
                where: {
                    team_name: name,
                }
            }
        );

        if(team) {
            return responseSend(res, 'success', 'Get Role Success', team);
        } else {
            return responseSend(res, 'error', 'Something wrong get role');
        }
    } catch (error) {
        console.log('Error get role:', error);
        await responseSend(res, 'error', error);
    }
}

export const UpdateTeam = async (req: Request, res: Response) => {
    const {uuid, teamName, teamDescription} = req.body;

    try {
        let updateTeam = await prismaClient.team_master.update(
            {
                where: {
                    uuid: uuid
                },
                data: {
                    team_name: teamName,
                    team_description: teamDescription,
                    updated_by: 'admin',
                    updated_at: now,
                }
            }
        );

        if(updateTeam) {
            return responseSend(res, 'success', 'Update Team Success', updateTeam);
        } else {
            return responseSend(res, 'error', 'Something wrong update team');
        }

    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}

export const DeleteTeam = async (req: Request, res: Response) => {
    const {uuid} = req.body;

    try {
        let findUserTeam = await prismaClient.user_master.findFirst({
            where: {
                team_master_id : uuid,
            }
        });

        if(findUserTeam) {
            return responseSend(res, 'error', 'Cannot delete team, user in team exist');
        }

        let deleteTeam = await prismaClient.team_master.delete(
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

export const CountTeam = async ( req: Request, res: Response) => {
    try {
        let countTeam = await prismaClient.team_master.count({});

        if(countTeam === 0) {
            return res.status(500).json({
                success: false,
                message: 'Team empty',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Count status found successfully',
            data: countTeam,
        });
    } catch (error) {
        console.log('Error get team:', error);
        await responseSend(res, 'error', error);
    }
}
