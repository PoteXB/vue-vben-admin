import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  emote = '/api/v1/avatar/expression',
}

export interface EmoteItem {
  name: string;
  duration: number;
  model_bidnings: number[];
  resources: {
    kind: number;
    asset: {
      id: string;
      url: string;
      name: string;
    };
    asset_id: string;
  }[];
}
export type EmoteItemResult = EmoteItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type EmotesGetParams = BasicPageParams & { s?: string; model?: number };
export type EmotesGetResult = BasicFetchResult<EmoteItemResult>;
export const getEmotes = (params: EmotesGetParams) => {
  return avatarHttp.get<EmotesGetResult>({ url: Api.emote, params });
};
export const getEmote = (id: string) => {
  return avatarHttp.get<EmoteItemResult>({ url: `${Api.emote}/${id}` });
};
export const postEmote = (data: EmoteItem) => {
  return avatarHttp.post<EmoteItemResult>({ url: Api.emote, data });
};
export const putEmote = (id: string, data: EmoteItem) => {
  return avatarHttp.put<EmoteItemResult>({ url: `${Api.emote}/${id}`, data });
};
export const delEmote = (id: string) => {
  return avatarHttp.delete({ url: `${Api.emote}/${id}` });
};
