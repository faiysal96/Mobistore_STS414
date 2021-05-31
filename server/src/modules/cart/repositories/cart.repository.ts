import { Repository, EntityRepository, MoreThan } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CartItemEntity } from '../cart.entity';
import { ConflictException, Logger } from '@nestjs/common';
import { CartItemDto, UpdateCartItemDto } from '../dto/cart.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(CartItemEntity)
export class CartItemRepository extends Repository<CartItemEntity> {

    private logger = new Logger('CartRepository');

    async getCartItems(userId) {
        return this.find({ where: { userId: userId, quantity: MoreThan(0) }, relations: ['product', 'product.images'] })
    }

    async createCartItem(cartItem: CartItemDto, userid): Promise<CartItemDto> {
        const { quantity, product } = cartItem;

        let cartItemEntity: CartItemEntity = await this.findOne({ where: { productId: product, userId: userid } })
        if (!cartItemEntity) {
            cartItemEntity = new CartItemEntity();
            cartItemEntity.quantity = quantity;
            cartItemEntity.productId = product;
            cartItemEntity.userId = userid;
        }
        cartItemEntity.quantity = quantity;

        try {
            const cartItemCreated = await this.save(cartItemEntity);
            return plainToClass(CartItemDto, cartItemCreated);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateCartItemQuantity(): Promise<CartItemDto> {
        // const { email, password, firstName, lastName, phone, role } = createUserDto;

        // const userEntity = new UserEntity();
        // userEntity.email = email;
        // userEntity.salt = await bcrypt.genSalt();
        // userEntity.password = await bcrypt.hash(password, user.salt);
        // userEntity.firstName = firstName;
        // userEntity.lastName = lastName;
        // userEntity.phone = phone;
        // userEntity.role = role;

        try {
            //   const  createdUser = await this.save(userEntity);
            return //plainToClass(UserDto, createdUser);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateQuantity(quantity: UpdateCartItemDto, cartId) {
        const cartItem = await this.findOne(cartId);
        cartItem.quantity = quantity.quantity
        if (cartItem) {
            return await this.save(cartItem);
        }
        return { success: false }
    }
}
