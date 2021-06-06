"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../modules/user/user.entity");
const typeorm_seeding_1 = require("typeorm-seeding");
const bcrypt = require("bcryptjs");
const user_role_enum_1 = require("../../modules/user/user-role.enum");
typeorm_seeding_1.define(user_entity_1.UserEntity, (faker) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const user = new user_entity_1.UserEntity();
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(faker.random.word(), user.salt);
    user.phone = faker.phone.phoneNumberFormat();
    user.role = faker.random.arrayElement([user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.USER]);
    return user;
});
//# sourceMappingURL=user.factory.js.map