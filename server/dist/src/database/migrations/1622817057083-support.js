"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.support1622817057083 = void 0;
class support1622817057083 {
    constructor() {
        this.name = 'support1622817057083';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `support` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `conversation` varchar(2200) NULL DEFAULT '[]', `status` varchar(255) ('RESOLVED', 'PENDING') NOT NULL, `userId` int ('RESOLVED', 'PENDING') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `productId` `productId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `orderId` `orderId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `paymentMethod` `paymentMethod` varchar(255) NOT NULL DEFAULT 'CARD'");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `supoort` ADD CONSTRAINT `FK_47bdc529c1f7fe2edc865e3145d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `supoort` DROP FOREIGN KEY `FK_47bdc529c1f7fe2edc865e3145d`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order` CHANGE `paymentMethod` `paymentMethod` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `orderId` `orderId` int NULL");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `productId` `productId` int NULL");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD `type` enum ('MOBILE', 'ACCESSORY') NOT NULL DEFAULT 'MOBILE'");
        await queryRunner.query("DROP TABLE `supoort`");
    }
}
exports.support1622817057083 = support1622817057083;
//# sourceMappingURL=1622817057083-support.js.map