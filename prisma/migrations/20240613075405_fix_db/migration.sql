/*
  Warnings:

  - You are about to drop the column `task_master_id` on the `case_master` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `case_master` DROP FOREIGN KEY `case_master_task_master_id_fkey`;

-- AlterTable
ALTER TABLE `active_user_monitoring_hist` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `case_master` DROP COLUMN `task_master_id`;
