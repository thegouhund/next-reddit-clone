/*
  Warnings:

  - Added the required column `description` to the `subbedit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rules` to the `subbedit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subbedit" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "rules" DROP NOT NULL;
