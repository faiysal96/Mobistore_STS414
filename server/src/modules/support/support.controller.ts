import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEntity } from '../user/user.entity';
import { StatusSupportDto, SupportDto, UpdateSupportDto } from './support.dto';
import { SupportService } from './support.service';

@Controller('api/support')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SupportController {
    constructor(private supportService: SupportService) { }

    @Get('getAll')
    @ApiResponse({ status: 200, description: 'Get All products' })
    async getAll() {
        return await this.supportService.getAll()
    }

    @Get('getMyPendingIssues')
    @ApiResponse({ status: 200, description: 'Get All products' })
    async getMyPendingIssues(@AuthUser() user: UserEntity,): Promise<any> {
        return await this.supportService.getByPendingStatusUser(user.id);
    }

    @Get('getMyIssues')
    @ApiResponse({ status: 200, description: 'Get All products' })
    async getMyIssues(@AuthUser() user: UserEntity): Promise<any> {
        return await this.supportService.getByUser(user.id);
    }

    @Get('getIssueById/:id')
    @ApiResponse({ status: 200, description: 'Get All products' })
    async getById(@AuthUser() user: UserEntity, @Param('id', ParseIntPipe) issueId: number): Promise<any> {
        return await this.supportService.getById(issueId);
    }

    @Post('addIssue')
    @ApiResponse({ status: 200, description: 'Get Seller Products' })
    async getSellerProducts(@AuthUser() user: UserEntity, @Body() issue: SupportDto): Promise<any> {
        return await this.supportService.addSupportIsuue(issue, user.id);
    }

    @Post('updateIssueConv/:issueId')
    // @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 200, description: 'Get Seller Products' })
    async updateIssueConv(@AuthUser() user: UserEntity, @Param('issueId', ParseIntPipe) issueId: number, @Body() conv: UpdateSupportDto[]): Promise<any> {
        return await this.supportService.updateSupportConversion(conv, issueId);
    }

    @Post('updateIssueStatus/:issueId')
    // @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 200, description: 'Get Seller Products' })
    async updateIssueStatus(@AuthUser() user: UserEntity, @Param('issueId', ParseIntPipe) issueId: number, @Body() status: StatusSupportDto): Promise<any> {
        return await this.supportService.updateSupportStatus(status.status, issueId);
    }
}
