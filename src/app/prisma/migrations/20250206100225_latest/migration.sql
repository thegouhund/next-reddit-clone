-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'MODERATOR', 'MEMBER');

-- AlterTable
ALTER TABLE "UserSubbedit" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "flairId" INTEGER,
ADD COLUMN     "mediaUrl" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "profilePicUrl" TEXT;

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER,
    "commentId" INTEGER,
    "isUpvote" BOOLEAN NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flair" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "subbeditId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_postId_commentId_key" ON "Vote"("userId", "postId", "commentId");

-- CreateIndex
CREATE INDEX "post_flairId_idx" ON "post"("flairId");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_flairId_fkey" FOREIGN KEY ("flairId") REFERENCES "Flair"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flair" ADD CONSTRAINT "Flair_subbeditId_fkey" FOREIGN KEY ("subbeditId") REFERENCES "subbedit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
