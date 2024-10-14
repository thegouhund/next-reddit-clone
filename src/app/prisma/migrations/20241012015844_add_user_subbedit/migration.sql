-- CreateTable
CREATE TABLE `_UserSubbedit` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserSubbedit_AB_unique`(`A`, `B`),
    INDEX `_UserSubbedit_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserSubbedit` ADD CONSTRAINT `_UserSubbedit_A_fkey` FOREIGN KEY (`A`) REFERENCES `subbedit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserSubbedit` ADD CONSTRAINT `_UserSubbedit_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
