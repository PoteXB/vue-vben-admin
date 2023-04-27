import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  scene = '/api/v1/avatar/scene',
}

export interface SceneItem {
  name: string;
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
export type SceneItemResult = SceneItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type ScenesGetParams = BasicPageParams & { s?: string; model?: number };
export type ScenesGetResult = BasicFetchResult<SceneItemResult>;
export const getScenes = (params: ScenesGetParams) => {
  return avatarHttp.get<ScenesGetResult>({ url: Api.scene, params });
};
export const getScene = (id: string) => {
  return avatarHttp.get<SceneItemResult>({ url: `${Api.scene}/${id}` });
};
export const postScene = (data: SceneItem) => {
  return avatarHttp.post<SceneItemResult>({ url: Api.scene, data });
};
export const putScene = (id: string, data: SceneItem) => {
  return avatarHttp.put<SceneItemResult>({ url: `${Api.scene}/${id}`, data });
};
export const delScene = (id: string) => {
  return avatarHttp.delete({ url: `${Api.scene}/${id}` });
};
