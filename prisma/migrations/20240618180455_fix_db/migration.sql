/*
  Warnings:

  - Added the required column `team_master_id` to the `project_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project_master` ADD COLUMN `team_master_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `project_master` ADD CONSTRAINT `project_master_team_master_id_fkey` FOREIGN KEY (`team_master_id`) REFERENCES `team_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
