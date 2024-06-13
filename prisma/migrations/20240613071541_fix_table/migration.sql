/*
  Warnings:

  - You are about to drop the column `duration` on the `active_user_monitoring_hist` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `case_master_hist` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `task_master_hist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `active_user_monitoring_hist` DROP COLUMN `duration`;

-- AlterTable
ALTER TABLE `case_master` ADD COLUMN `progress` BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `case_master_hist` DROP COLUMN `duration`,
    ADD COLUMN `progress` BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `task_master` ADD COLUMN `progress` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `task_master_hist` DROP COLUMN `duration`,
    ADD COLUMN `progress` BIGINT NOT NULL DEFAULT 0;
