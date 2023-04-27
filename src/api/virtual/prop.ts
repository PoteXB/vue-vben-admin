import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  properties = '/api/v1/avatar/property',
}

export interface PropItem {
  name: string;
  model_bidnings: number[];
  type: number;
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
export type PropItemResult = PropItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type PropsGetParams = BasicPageParams & { s?: string; model?: number };
export type PropsGetResult = BasicFetchResult<PropItemResult>;
export const getProps = (params: PropsGetParams) => {
  return avatarHttp.get<PropsGetResult>({ url: Api.properties, params });
};
export const getProp = (id: string) => {
  return avatarHttp.get<PropItemResult>({ url: `${Api.properties}/${id}` });
};
export const postProp = (data: PropItem) => {
  return avatarHttp.post<PropItemResult>({ url: Api.properties, data });
};
export const putProp = (id: string, data: PropItem) => {
  return avatarHttp.put<PropItemResult>({ url: `${Api.properties}/${id}`, data });
};
export const delProp = (id: string) => {
  return avatarHttp.delete({ url: `${Api.properties}/${id}` });
};
