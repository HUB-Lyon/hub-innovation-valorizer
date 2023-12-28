import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
    
    async getInfoByEmail(email: string) {
        let user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.email', 'user.admin'])
            .where("user.email = :email", { email })
            .getOne()
        if (!user) user = await this.userRepository.save({ email })
        return user;
    }
}
