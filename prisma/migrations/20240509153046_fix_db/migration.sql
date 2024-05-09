-- CreateTable
CREATE TABLE `admin_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `admin_master_nik_key`(`nik`),
    UNIQUE INDEX `admin_master_email_key`(`email`),
    INDEX `admin_master_email_idx`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `role_master_id` VARCHAR(191) NOT NULL,
    `team_master_id` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `active_user` BOOLEAN NOT NULL DEFAULT true,
    `session` VARCHAR(191) NULL,
    `darkmode_enabled` BOOLEAN NOT NULL DEFAULT false,
    `notification_enabled` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `user_master_nik_key`(`nik`),
    UNIQUE INDEX `user_master_email_key`(`email`),
    INDEX `user_master_nik_email_password_idx`(`nik`, `email`, `password`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `team_name` VARCHAR(191) NOT NULL,
    `team_description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `team_master_team_name_key`(`team_name`),
    INDEX `team_master_team_name_idx`(`team_name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `role_name` VARCHAR(191) NOT NULL,
    `role_description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `role_master_role_name_key`(`role_name`),
    INDEX `role_master_role_name_idx`(`role_name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `status_name` VARCHAR(191) NOT NULL,
    `status_description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `status_master_status_name_key`(`status_name`),
    INDEX `status_master_status_name_idx`(`status_name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `project_tcode` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `project_description` VARCHAR(191) NULL,
    `sa_leader_id` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `status_master_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    UNIQUE INDEX `project_master_project_tcode_key`(`project_tcode`),
    UNIQUE INDEX `project_master_project_name_key`(`project_name`),
    INDEX `project_master_project_tcode_project_name_idx`(`project_tcode`, `project_name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `menu_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `menu_tcode` VARCHAR(191) NOT NULL,
    `menu_name` VARCHAR(191) NOT NULL,
    `menu_description` VARCHAR(191) NULL,
    `project_master_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `task_name` VARCHAR(191) NOT NULL,
    `task_description` VARCHAR(191) NULL,
    `menu_master_id` VARCHAR(191) NOT NULL,
    `status_master_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_master_hist` (
    `uuid` VARCHAR(191) NOT NULL,
    `task_name` VARCHAR(191) NOT NULL,
    `task_description` VARCHAR(191) NULL,
    `user_master_id` VARCHAR(191) NULL,
    `menu_master_id` VARCHAR(191) NULL,
    `status_master_id` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `duration` BIGINT NULL,
    `action` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_master` (
    `uuid` VARCHAR(191) NOT NULL,
    `case_name` VARCHAR(191) NOT NULL,
    `case_description` VARCHAR(191) NULL,
    `task_master_id` VARCHAR(191) NOT NULL,
    `status_master_id` VARCHAR(191) NOT NULL,
    `user_project_id` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_master_hist` (
    `uuid` VARCHAR(191) NOT NULL,
    `case_id` VARCHAR(191) NULL,
    `case_name` VARCHAR(191) NULL,
    `case_description` VARCHAR(191) NULL,
    `task_master_id` VARCHAR(191) NULL,
    `status_master_id` VARCHAR(191) NULL,
    `project_master_id` VARCHAR(191) NULL,
    `user_project_id` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `duration` BIGINT NULL,
    `action` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `active_user_monitoring` (
    `uuid` VARCHAR(191) NOT NULL,
    `user_master_id` VARCHAR(191) NOT NULL,
    `task_master_id` VARCHAR(191) NOT NULL,
    `case_master_id` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NULL,
    `start_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_time` DATETIME(3) NULL,
    `active` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `active_user_monitoring_hist` (
    `uuid` VARCHAR(191) NOT NULL,
    `active_user_monitoring_id` VARCHAR(191) NOT NULL,
    `user_master_id` VARCHAR(191) NULL,
    `task_master_id` VARCHAR(191) NULL,
    `case_master_id` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `start_time` DATETIME(3) NULL,
    `end_time` DATETIME(3) NULL,
    `active` BOOLEAN NULL,
    `duration` INTEGER NULL,
    `action` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_master` ADD CONSTRAINT `user_master_role_master_id_fkey` FOREIGN KEY (`role_master_id`) REFERENCES `role_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_master` ADD CONSTRAINT `user_master_team_master_id_fkey` FOREIGN KEY (`team_master_id`) REFERENCES `team_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_master` ADD CONSTRAINT `project_master_sa_leader_id_fkey` FOREIGN KEY (`sa_leader_id`) REFERENCES `user_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_master` ADD CONSTRAINT `project_master_status_master_id_fkey` FOREIGN KEY (`status_master_id`) REFERENCES `status_master`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_project` ADD CONSTRAINT `user_project_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_project` ADD CONSTRAINT `user_project_user_master_id_fkey` FOREIGN KEY (`user_master_id`) REFERENCES `user_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_master` ADD CONSTRAINT `menu_master_project_master_id_fkey` FOREIGN KEY (`project_master_id`) REFERENCES `project_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_menu_master_id_fkey` FOREIGN KEY (`menu_master_id`) REFERENCES `menu_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_master` ADD CONSTRAINT `task_master_status_master_id_fkey` FOREIGN KEY (`status_master_id`) REFERENCES `status_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_master` ADD CONSTRAINT `case_master_task_master_id_fkey` FOREIGN KEY (`task_master_id`) REFERENCES `task_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_master` ADD CONSTRAINT `case_master_status_master_id_fkey` FOREIGN KEY (`status_master_id`) REFERENCES `status_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_master` ADD CONSTRAINT `case_master_user_project_id_fkey` FOREIGN KEY (`user_project_id`) REFERENCES `user_project`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_user_master_id_fkey` FOREIGN KEY (`user_master_id`) REFERENCES `user_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_task_master_id_fkey` FOREIGN KEY (`task_master_id`) REFERENCES `task_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `active_user_monitoring` ADD CONSTRAINT `active_user_monitoring_case_master_id_fkey` FOREIGN KEY (`case_master_id`) REFERENCES `case_master`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
