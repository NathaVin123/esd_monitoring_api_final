/*
  Warnings:

  - You are about to drop the column `user_project_id` on the `case_master` table. All the data in the column will be lost.
  - You are about to drop the column `user_project_id` on the `task_master` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `case_master` DROP FOREIGN KEY `case_master_user_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `task_master` DROP FOREIGN KEY `task_master_user_project_id_fkey`;

-- AlterTable
ALTER TABLE `case_master` DROP COLUMN `user_project_id`;

-- AlterTable
ALTER TABLE `task_master` DROP COLUMN `user_project_id`;
