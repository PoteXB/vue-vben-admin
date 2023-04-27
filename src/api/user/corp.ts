import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
enum Api {
  CorpsAll = '/v1/user/corpsAll',
  Corps = '/v1/user/corps',
  Corp = '/v1/user/corp',
}
export interface UserCorpItem {
  name?: string;
  id?: string;
  remark?: string;
}
export type UserCorpResultItem = UserCorpItem & {
  status?: number;
  created_at?: string;
  updated_at?: string;
};
export type UserCorpListGetParams = BasicPageParams & {};
export type UserCorpListGetResult = BasicFetchResult<UserCorpResultItem>;

export const getAllCorps = () => defHttp.get<UserCorpListGetResult>({ url: Api.CorpsAll }, {});

export const getUserCorps = (params: UserCorpListGetParams) =>
  defHttp.get<UserCorpListGetResult>({ url: Api.Corps, params }, {});

export const postUserCorp = (data: UserCorpItem) =>
  defHttp.post<UserCorpResultItem>({ url: Api.Corp, params: data });

export const patchUserCorp = (id: string, data: UserCorpItem) =>
  defHttp.patch<UserCorpResultItem>({ url: `${Api.Corp}/${id}`, params: data });

export const delUserCorp = (id: string) => defHttp.delete<boolean>({ url: `${Api.Corp}/${id}` });
