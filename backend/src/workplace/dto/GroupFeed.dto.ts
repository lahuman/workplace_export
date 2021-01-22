import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

class OwnerRO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

class CommentRO {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  from: OwnerRO;
  @IsNotEmpty()
  @ApiProperty()
  message: string;
  @IsNotEmpty()
  @ApiProperty()
  like_count: number;
  @IsNotEmpty()
  @ApiProperty()
  created_time: string;
  @IsOptional()
  @ApiProperty()
  comments?: { data: CommentRO[] };

}

class FeedInfo {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  from: OwnerRO;
  @IsNotEmpty()
  @ApiProperty()
  to: { data: OwnerRO[] };
  @IsNotEmpty()
  @ApiProperty()
  message: string;
  @IsNotEmpty()
  @ApiProperty()
  created_time: string;
  @IsNotEmpty()
  @ApiProperty()
  updated_time: string;
  @IsOptional()
  @ApiProperty({type:[CommentRO]})
  comments?: { data: CommentRO[], id: string };
}


export class GroupFeedRO {
  @IsNotEmpty()
  @ApiProperty({ description: "feed data with comments", type: [FeedInfo]})
  data: FeedInfo[];
  @IsOptional()
  @ApiProperty({ description: "next page Token", required: false })
  paging?: { next: string };

  constructor(data:FeedInfo[], paging?:{next:string}){
    this.data = data;
    this.paging = paging;
  }
}

export class FeedInfoDto {
  @IsNotEmpty()
  @ApiProperty({ description: "workplace group id" })
  groupId: string;
  @IsOptional()
  @ApiProperty({ description: "next page Token", required: false, default: "" })
  paging_token?: string;

  constructor(groupId: string, paging_token?: string) {
    this.groupId = groupId;
    this.paging_token = paging_token;
  }
}