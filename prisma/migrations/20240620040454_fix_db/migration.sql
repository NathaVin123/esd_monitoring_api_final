-- DropForeignKey
ALTER TABLE `case_master` DROP FOREIGN KEY `case_master_project_master_id_fkey`;

-- DropForeignKey
ALTER TABLE `task_master` DROP FOREIGN KEY `task_master_project_master_id_fkey`;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_master` ADD CONSTRAINT `case_master_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
