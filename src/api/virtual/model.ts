import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  models = '/api/v1/avatar/virtual/model',
}

export interface AssetItem {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  url: string;
  type: number;
}

export interface ModelItem {
  id: number;
  name: string;
  sounds: number[];
  wake_up_text: string;
  remark: string;
  assets: AssetItem[];
  created_at: number;
  updated_at: number;
}
export type ModelItemResult = ModelItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type ModelsGetParams = BasicPageParams & { s?: string };
export type ModelsGetResult = BasicFetchResult<ModelItemResult>;
export const getModels = (params: ModelsGetParams) => {
  return avatarHttp.get<ModelsGetResult>({ url: Api.models, params });
};
export const getModel = (id: string) => {
  return avatarHttp.get<ModelItemResult>({ url: `${Api.models}/${id}` });
};
export const postModel = (data: ModelItem) => {
  return avatarHttp.post<ModelItemResult>({ url: Api.models, data });
};
export const putModel = (id: string, data: ModelItem) => {
  return avatarHttp.put<ModelItemResult>({ url: `${Api.models}/${id}`, data });
};
export const delModel = (id: number) => {
  return avatarHttp.delete({ url: `${Api.models}/${id}` });
};
