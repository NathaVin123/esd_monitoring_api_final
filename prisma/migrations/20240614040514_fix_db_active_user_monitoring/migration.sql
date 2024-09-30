/*
  Warnings:

  - You are about to drop the column `status` on the `active_user_monitoring` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `active_user_monitoring_hist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `active_user_monitoring` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `active_user_monitoring_hist` DROP COLUMN `status`;
