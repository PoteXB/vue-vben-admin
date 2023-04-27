import { avatarHttp } from '/@/utils/http/axios';
export enum Api {
  tenant = '/api/v1/avatar/tenant/info',
}

export function getTenantInfo() {
  return avatarHttp.get({ url: `${Api.tenant}` });
}

export function postTenantInfo() {
  return avatarHttp.post({ url: `${Api.tenant}` });
}
