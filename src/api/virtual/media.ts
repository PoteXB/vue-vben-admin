import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  media = '/api/v1/avatar/media',
}

export interface MediaItem {
  name: string;
  type: number;
  remark: string;
  camera_url?: string;
  mac_addr?: string;
  asset?: { id: string; url: string }[];
  light_id?: string;
  dgsl?: number;
  lights?: {
    key: string;
    name: string;
  }[];
}
export type MediaItemResult = MediaItem & {
  id: string;
  md5: string;
  url: string;
  crop_id: number;
  created_at: string;
  updated_at: string;
};
export type MediasGetParams = BasicPageParams & { s?: string; type?: number };
export type MediasGetResult = BasicFetchResult<MediaItemResult>;
export function getMedias(params: MediasGetParams) {
  return avatarHttp.get<MediasGetResult>({ url: Api.media, params });
}
export function getMedia(id: string) {
  return avatarHttp.get<MediaItemResult>({ url: `${Api.media}/${id}` });
}
export function postMedia(data: MediaItem) {
  return avatarHttp.post<MediaItemResult>({ url: Api.media, data });
}
export function putMedia(id: string, data: MediaItem) {
  return avatarHttp.put<MediaItemResult>({ url: `${Api.media}/${id}`, data });
}
export function delMedia(id: string) {
  return avatarHttp.delete({ url: `${Api.media}/${id}` });
}
