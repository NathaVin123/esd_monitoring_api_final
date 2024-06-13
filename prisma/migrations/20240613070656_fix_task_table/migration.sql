/*
  Warnings:

  - You are about to drop the column `user_masterUuid` on the `task_master` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task_master` DROP FOREIGN KEY `task_master_user_masterUuid_fkey`;

-- AlterTable
ALTER TABLE `case_master` MODIFY `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `case_master_hist` MODIFY `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `task_master` DROP COLUMN `user_masterUuid`,
    ADD COLUMN `end_date` DATETIME(3) NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
