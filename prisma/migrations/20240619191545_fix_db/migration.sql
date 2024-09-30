/*
  Warnings:

  - You are about to drop the column `project_master_id` on the `active_user_monitoring_hist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `active_user_monitoring_hist` DROP COLUMN `project_master_id`,
    ADD COLUMN `team_master_id` VARCHAR(191) NULL;
