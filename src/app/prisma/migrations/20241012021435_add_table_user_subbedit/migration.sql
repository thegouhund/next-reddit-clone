-- CreateTable
CREATE TABLE `UserSubbedit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subbeditId` INTEGER NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `UserSubbedit_userId_idx`(`userId`),
    INDEX `UserSubbedit_subbeditId_idx`(`subbeditId`),
    UNIQUE INDEX `UserSubbedit_userId_subbeditId_key`(`userId`, `subbeditId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSubbedit` ADD CONSTRAINT `UserSubbedit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubbedit` ADD CONSTRAINT `UserSubbedit_subbeditId_fkey` FOREIGN KEY (`subbeditId`) REFERENCES `subbedit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
