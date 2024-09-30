/*
  Warnings:

  - You are about to drop the column `darkmode_enabled` on the `user_master` table. All the data in the column will be lost.
  - You are about to drop the column `notification_enabled` on the `user_master` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `user_master` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_master` DROP COLUMN `darkmode_enabled`,
    DROP COLUMN `notification_enabled`,
    DROP COLUMN `session`;
