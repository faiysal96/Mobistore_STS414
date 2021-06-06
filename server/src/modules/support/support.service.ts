import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportDto, UpdateSupportDto } from './support.dto';
import { SupportRepository } from './support.repository';

@Injectable()
export class SupportService {

    constructor(@InjectRepository(SupportRepository) private readonly supportRepo: SupportRepository) {
    }

    async getById(id: number): Promise<any> {
        return await this.supportRepo.findOne(id);
    }   

    async getAll(): Promise<any> {
        return await this.supportRepo.find({
            order: {
                updatedAt: "DESC"
            },
            relations:['user']
        })
    }

    async getByUser(userId: number): Promise<any> {
        return await this.supportRepo.find({
            where: { userId }, order: {
                updatedAt: "DESC"
            }
        })
    }

    async getByPendingStatusUser(userId: number): Promise<any> {
        return await this.supportRepo.find({
            where: { userId, status: 'PENDING' }, order: {
                updatedAt: "DESC"
            }
        })
    }


    async addSupportIsuue(supportDto: SupportDto, userId: number): Promise<any> {
        return await this.supportRepo.addSupportIsuue(supportDto, userId)
    }

    async updateSupportConversion(conv: UpdateSupportDto[], id: number): Promise<any> {
        return await this.supportRepo.updateSupportConversion(conv, id)
    }

    async updateSupportStatus(status: string, id: number): Promise<any> {
        return await this.supportRepo.updateSupportStatus(status, id)
    }

}
