/*
  Warnings:

  - You are about to drop the column `menu_master_id` on the `task_master` table. All the data in the column will be lost.
  - You are about to drop the column `menu_master_id` on the `task_master_hist` table. All the data in the column will be lost.
  - You are about to drop the `admin_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_master` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `project_master_id` to the `task_master` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menu_master` DROP FOREIGN KEY `menu_master_project_master_id_fkey`;

-- DropForeignKey
ALTER TABLE `task_master` DROP FOREIGN KEY `task_master_menu_master_id_fkey`;

-- AlterTable
ALTER TABLE `task_master` DROP COLUMN `menu_master_id`,
    ADD COLUMN `project_master_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task_master_hist` DROP COLUMN `menu_master_id`;

-- DropTable
DROP TABLE `admin_master`;

-- DropTable
DROP TABLE `menu_master`;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
