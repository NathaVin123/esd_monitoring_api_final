/*
  Warnings:

  - You are about to drop the column `project_master_id` on the `active_user_monitoring` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `active_user_monitoring` DROP FOREIGN KEY `active_user_monitoring_project_master_id_fkey`;

-- AlterTable
ALTER TABLE `active_user_monitoring` DROP COLUMN `project_master_id`,
    ADD COLUMN `team_master_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_team_master_id_fkey` FOREIGN KEY (`team_master_id`) REFERENCES `team_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
