-- DropForeignKey
ALTER TABLE `active_user_monitoring` DROP FOREIGN KEY `active_user_monitoring_case_master_id_fkey`;

-- DropForeignKey
ALTER TABLE `active_user_monitoring` DROP FOREIGN KEY `active_user_monitoring_task_master_id_fkey`;

-- AlterTable
ALTER TABLE `active_user_monitoring` MODIFY `task_master_id` VARCHAR(191) NULL,
    MODIFY `case_master_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_task_master_id_fkey` FOREIGN KEY (`task_master_id`) REFERENCES `task_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_case_master_id_fkey` FOREIGN KEY (`case_master_id`) REFERENCES `case_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
