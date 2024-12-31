/*
  Warnings:

  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "maxSpots" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "time" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Event_category_idx" ON "Event"("category");
