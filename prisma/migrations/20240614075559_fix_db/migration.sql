-- AlterTable
ALTER TABLE `active_user_monitoring` ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `active_user_monitoring_hist` ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0;
