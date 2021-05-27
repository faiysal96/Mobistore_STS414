import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../../modules/user/user.entity";
import { Connection } from "typeorm";

import { UserRepository } from '../../modules/user/repositories/user.repository'
import { Injectable } from "@nestjs/common";

let users = [
    {
        firstName: 'Admin',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test@admin.com',
        phone: '+1-033-09-090-8',
        role: 'ADMIN'

    },
    {
        firstName: 'User',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test@user.com',
        phone: '+1-033-09-090-8',
        role: 'GHOST'

    },
    {
        firstName: 'User2',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test1@user.com',
        phone: '+1-033-09-090-8',
        role: 'GHOST'

    },
    {
        firstName: 'Manger',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test@manager.com',
        phone: '+1-033-09-090-8',
        role: 'MANAGER'

    },
    {
        firstName: 'Manger2',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test1@manager.com',
        phone: '+1-033-09-090-8',
        role: 'MANAGER'

    }
]

@Injectable()
export class SeederService {
    constructor(private userRepo: UserRepository) {}
    public async run() {

        try {
            let user_list = []
        for (let index = 0; index < users.length; index++) {
            let user = new UserEntity();
            user.firstName = user[index].firstName;
            user.lastName = user[index].firstName
            user.role = user[index].firstName
            user.email = user[index].firstName
            user.password = user[index].password
        }
        await this.userRepo.save(user_list);
        return {sucess: false , error: ''}
        } catch (error) {
            return {sucess: false , error: error}
        }
    }
}





