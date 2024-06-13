/*
  Warnings:

  - You are about to alter the column `progress` on the `case_master` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `case_master` MODIFY `progress` INTEGER NOT NULL DEFAULT 0;
