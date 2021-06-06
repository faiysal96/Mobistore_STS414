import { NotFoundException } from "@nestjs/common";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { EntityRepository, Repository } from "typeorm";
import { SupportDto } from "./support.dto";

import { SupportEntity } from "./support.entity";


@EntityRepository(SupportEntity)
export class SupportRepository extends Repository<SupportEntity> {



    async addSupportIsuue(supportDto: SupportDto, userId: number): Promise<any> {
        const { title, description } = supportDto;

        const supoortEntity = new SupportEntity();
        supoortEntity.title = title;
        supoortEntity.description = description
        supoortEntity.userId = userId;
        supoortEntity.status = 'PENDING'

        try {
            const createProduct = await this.save(supoortEntity)
            return plainToClass(SupportDto, createProduct);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateSupportConversion(conv: Array<any>, id: number): Promise<any> {

        let issue = await this.findOne(id);
        if (!issue) {
            throw new NotFoundException(`Support Issue with ID "${id}" not found`);
        }

        try {
            this.merge(issue, { conversation: JSON.stringify(conv) });
            const updateIssue = await this.save(issue)
            return updateIssue;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateSupportStatus(status, id: number): Promise<any> {

        let issue = await this.findOne(id);
        if (!issue) {
            throw new NotFoundException(`Support Issue with ID "${id}" not found`);
        }
        try {
            this.merge(issue, { status });
            const updateIssue = await this.save(issue)
            return updateIssue;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}