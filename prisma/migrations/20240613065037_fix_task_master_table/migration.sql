-- AlterTable
ALTER TABLE `task_master` ADD COLUMN `user_masterUuid` VARCHAR(191) NULL,
    ADD COLUMN `user_project_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_user_masterUuid_fkey` FOREIGN KEY (`user_masterUuid`) REFERENCES `user_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_user_project_id_fkey` FOREIGN KEY (`user_project_id`) REFERENCES `user_project`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
