import {Request, Response} from 'express'
import {prismaClient} from "../server";
import {responseSend} from "../exceptions/errorHandling";

console.log('Team Controller Init');

export const createTeam = async (req: Request, res: Response) => {
    try {
        const { teamName, teamDescription } = req.body;

        let findTeam = await prismaClient.team_master.findFirst({where: {team_name: teamName}})

        if(findTeam) {
            return responseSend(res, 'error', 'Team Already Exist');
        } else {
            console.log('User not found');
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

export const getTeam = async (req: Request, res: Response) => {
    // const {} = req.body;

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
