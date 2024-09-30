-- CreateTable
CREATE TABLE `user_project` (
    `uuid` VARCHAR(191) NOT NULL,
    `project_master_id` VARCHAR(191) NOT NULL,
    `user_master_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_project` ADD CONSTRAINT `user_project_user_master_id_fkey` FOREIGN KEY (`user_master_id`) REFERENCES `user_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_project` ADD CONSTRAINT `user_project_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
