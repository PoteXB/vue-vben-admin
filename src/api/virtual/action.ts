import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  action = '/api/v1/avatar/action',
  duration = '/api/v1/avatar/action/duration',
}

export interface ActionItem {
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
export type ActionItemResult = ActionItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type ActionDurationResult = {
  duration: number;
};
export type ActionsGetParams = BasicPageParams & { s?: string; model?: number };
export type ActionsGetResult = BasicFetchResult<ActionItemResult>;
export const getActions = (params: ActionsGetParams) => {
  return avatarHttp.get<ActionsGetResult>({ url: Api.action, params });
};
export const getAction = (id: string) => {
  return avatarHttp.get<ActionItemResult>({ url: `${Api.action}/${id}` });
};
export const postAction = (data: ActionItem) => {
  return avatarHttp.post<ActionItemResult>({ url: Api.action, data });
};
export const putAction = (id: string, data: ActionItem) => {
  return avatarHttp.put<ActionItemResult>({ url: `${Api.action}/${id}`, data });
};
export const delAction = (id: string) => {
  return avatarHttp.delete({ url: `${Api.action}/${id}` });
};
export const getDuration = (assetID: string) => {
  return avatarHttp.get<ActionDurationResult>({ url: `${Api.duration}/${assetID}` });
};
