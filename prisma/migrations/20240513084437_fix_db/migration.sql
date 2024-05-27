/*
  Warnings:

  - You are about to drop the column `nik2` on the `admin_master` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nik]` on the table `admin_master` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nik` to the `admin_master` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `admin_master_nik2_key` ON `admin_master`;

-- AlterTable
ALTER TABLE `admin_master` DROP COLUMN `nik2`,
    ADD COLUMN `nik` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `admin_master_nik_key` ON `admin_master`(`nik`);
