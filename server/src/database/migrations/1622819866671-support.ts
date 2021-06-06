import {MigrationInterface, QueryRunner} from "typeorm";

export class support1622819866671 implements MigrationInterface {
    name = 'support1622819866671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `support` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `conversation` varchar(2200) NULL DEFAULT '[]', `status` enum ('RESOLVED', 'PENDING') NOT NULL DEFAULT 'PENDING', `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `productId` `productId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `orderId` `orderId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `order` CHANGE `paymentMethod` `paymentMethod` varchar(255) NOT NULL DEFAULT 'CARD'");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `support` ADD CONSTRAINT `FK_0768a9a514d90be0f9d00fd8036` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `support` DROP FOREIGN KEY `FK_0768a9a514d90be0f9d00fd8036`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_904370c093ceea4369659a3c810`");
        await queryRunner.query("ALTER TABLE `order_item` DROP FOREIGN KEY `FK_646bf9ece6f45dbe41c203e06e0`");
        await queryRunner.query("ALTER TABLE `order` CHANGE `paymentMethod` `paymentMethod` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `orderId` `orderId` int NULL");
        await queryRunner.query("ALTER TABLE `order_item` CHANGE `productId` `productId` int NULL");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_item` ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` ADD `type` enum ('MOBILE', 'ACCESSORY') NOT NULL DEFAULT 'MOBILE'");
        await queryRunner.query("DROP TABLE `support`");
    }

}
