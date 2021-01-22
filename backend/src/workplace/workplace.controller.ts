import { Body, Controller, Get, HttpCode, Logger, Post, Query, Header } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import {
  ApiQuery, ApiTags, ApiOperation, ApiBody, ApiResponse
} from '@nestjs/swagger';
import { GroupRO } from './dto/Group.dto';
import { FeedInfoDto, GroupFeedRO } from './dto/GroupFeed.dto';

@ApiTags('workplace')
@Controller('workplace')
export class WorkplaceController {
  private readonly logger = new Logger(WorkplaceController.name);
  constructor(private workplaceService: WorkplaceService) { }

  @ApiQuery({ name: 'groupId', description: 'Group ID at workplace', type: 'string', required: true })
  @ApiOperation({ summary: 'Search Group Info' })
  @Get('group')
  async getWorkplaceGroupInfo(@Query("groupId") groupId: string): Promise<GroupRO> {
    return this.workplaceService.getWorkplaceGroupInfo(groupId);
  }

  @ApiBody({type:FeedInfoDto })
  @ApiOperation({ summary: 'Get Group feed with comment' })
  @ApiResponse({ status: 200, description: 'feed info by group', type: GroupFeedRO })
  @ApiResponse({ status: 400, description: 'request fail ' })
  @HttpCode(200)
  @Post("feed")
  async getWorkplaceGroupFeed(@Body() feedInfo:FeedInfoDto): Promise<GroupFeedRO> {
    return this.workplaceService.getWorkplaceGroupFeed(feedInfo.groupId, feedInfo.paging_token);
  }
}
