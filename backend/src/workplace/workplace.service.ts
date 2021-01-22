import { Injectable, HttpService, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroupRO } from './dto/Group.dto';
import { GroupFeedRO } from './dto/GroupFeed.dto';

@Injectable()
export class WorkplaceService {
  private readonly logger = new Logger(WorkplaceService.name);

  readonly WP_GRAPH_URL = this.configService.get<string>('WP_GRAPH_URL');
  readonly WP_TOKEN = this.configService.get<string>('WP_TOKEN');
  readonly DEFAULT_LIMIT = this.configService.get<string>('DEFAULT_LIMIT');
  constructor(private httpService: HttpService, private configService: ConfigService) {
  }
  async getWorkplaceGroupInfo(groupId: string): Promise<GroupRO> {
    const call = this.httpService.get(`${this.WP_GRAPH_URL}/${groupId}?fields=id,name,archived,privacy,cover,owner,updated_time&access_token=${this.WP_TOKEN}`).toPromise();
    return call.then(({ data }) => data).catch(e => {
      this.logger.error(e);
      throw new HttpException("Bad Request.", HttpStatus.BAD_REQUEST);
    });
  }

  async getWorkplaceGroupFeed(groupId: string, paging_token:string): Promise<GroupFeedRO>{
    const call = this.httpService.get(`${this.WP_GRAPH_URL}/${groupId}/feed?fields=from,to,message,link,name,caption,description,created_time,updated_time,comments{from,to,message,link,name,caption,description,created_time,updated_time,like_count,comments{from,to,message,link,name,caption,description,created_time,updated_time,like_count}}&access_token=${this.WP_TOKEN}&limit=${this.DEFAULT_LIMIT}${paging_token&&paging_token}`).toPromise();
    return call.then(({ data }) => {
      data.paging 
      && (data.paging.previous = data.paging.previous.substring(data.paging.previous.indexOf('&__previous=')))
        && (data.paging.next = data.paging.next.substring(data.paging.next.indexOf('&until='))) 
      return data;
    }).catch(e => {
      this.logger.error(e);
      throw new HttpException("Bad Request.", HttpStatus.BAD_REQUEST);
    });
  }
}
