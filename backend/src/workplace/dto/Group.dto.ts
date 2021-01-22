
interface CoverRO {
  id: string;
  offset_x: number;
  offset_y: number;
  source: string;
}
interface OwnerRO {
  name: string;
  id: string;
}
export interface GroupRO {
  id: string;
  name: string;
  archived: boolean;
  privacy: string;
  cover: CoverRO;
  owner: OwnerRO;
  updated_time: string;
}