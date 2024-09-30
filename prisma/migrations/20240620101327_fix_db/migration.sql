-- AlterTable
ALTER TABLE `active_user_monitoring_hist` ADD COLUMN `project_master_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `case_master` ADD COLUMN `user_master_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task_master` ADD COLUMN `user_master_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_user_master_id_fkey` FOREIGN KEY (`user_master_id`) REFERENCES `user_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_master` ADD CONSTRAINT `case_master_user_master_id_fkey` FOREIGN KEY (`user_master_id`) REFERENCES `user_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
