/*
  Warnings:

  - Added the required column `project_master_id` to the `case_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `case_master` ADD COLUMN `project_master_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `case_master` ADD CONSTRAINT `case_master_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
