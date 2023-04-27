import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  List = '/v1/user/list',
  Add = '/v1/user/add',
  Edit = '/v1/user/edit',
  Del = '/v1/user/del',
}
export interface UserItem {
  id?: string;
  username?: string;
  password?: string;
  nickname?: string;
}
export type UserResultItem = UserItem & {
  corp_id?: number;
  status?: number;
  avatar?: number;
  phone?: number;
  role?: number;
  created_at?: string;
  updated_at?: string;
};
export type UserListGetParams = BasicPageParams & {};
export type UserListGetResult = BasicFetchResult<UserResultItem>;

export const getUserList = (params: UserListGetParams) =>
  defHttp.get<UserListGetResult>({ url: Api.List, params }, {});

export const postUser = (data: UserItem) =>
  defHttp.post<UserListGetResult>({ url: Api.Add, params: data });

export const patchUser = (id: string, data: UserItem) =>
  defHttp.patch<UserListGetResult>({ url: `${Api.Edit}/${id}`, params: data });

export const delUser = (id: string) => defHttp.delete<boolean>({ url: `${Api.Del}/${id}` });
