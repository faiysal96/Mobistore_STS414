import { UserRepository } from '../../modules/user/repositories/user.repository';
export declare class SeederService {
    private userRepo;
    constructor(userRepo: UserRepository);
    run(): unknown;
}
