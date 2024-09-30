-- AlterTable
ALTER TABLE `active_user_monitoring` ADD COLUMN `project_master_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `active_user_monitoring_hist` ADD COLUMN `project_master_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
