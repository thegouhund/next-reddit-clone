-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subbedit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subbedit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubbedit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subbeditId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSubbedit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "upvote" INTEGER DEFAULT 0,
    "commentCount" INTEGER DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "subbeditId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "upvote" INTEGER DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "parentCommentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "name" ON "subbedit"("name");

-- CreateIndex
CREATE INDEX "UserSubbedit_userId_idx" ON "UserSubbedit"("userId");

-- CreateIndex
CREATE INDEX "UserSubbedit_subbeditId_idx" ON "UserSubbedit"("subbeditId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubbedit_userId_subbeditId_key" ON "UserSubbedit"("userId", "subbeditId");

-- CreateIndex
CREATE INDEX "subbeditId" ON "post"("subbeditId");

-- CreateIndex
CREATE INDEX "user_id_post" ON "post"("userId");

-- CreateIndex
CREATE INDEX "parentCommentId" ON "comment"("parentCommentId");

-- CreateIndex
CREATE INDEX "postId" ON "comment"("postId");

-- CreateIndex
CREATE INDEX "user_id_comment" ON "comment"("userId");

-- AddForeignKey
ALTER TABLE "UserSubbedit" ADD CONSTRAINT "UserSubbedit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubbedit" ADD CONSTRAINT "UserSubbedit_subbeditId_fkey" FOREIGN KEY ("subbeditId") REFERENCES "subbedit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_ibfk_1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_ibfk_2" FOREIGN KEY ("subbeditId") REFERENCES "subbedit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_ibfk_1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_ibfk_2" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_ibfk_3" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
