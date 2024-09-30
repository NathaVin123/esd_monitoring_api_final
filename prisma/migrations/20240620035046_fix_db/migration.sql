/*
  Warnings:

  - You are about to drop the `user_project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_project` DROP FOREIGN KEY `user_project_project_master_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_project` DROP FOREIGN KEY `user_project_user_master_id_fkey`;

-- DropTable
DROP TABLE `user_project`;
