import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
enum Api {
  deviceGroup = '/api/v1/avatar/device/group',
}

export interface DeviceGroupItem {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  code: string;
  remark: string;
}
export type DeviceGroupItemResult = DeviceGroupItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type DeviceGroupGetParams = BasicPageParams;
export type DeviceGroupGetResult = BasicFetchResult<DeviceGroupItemResult>;
// 这个接口暂时不用，因为它返回的字段和 getDeviceGroups 相同
// export function getDeviceGroup(id: string) {
//   return avatarHttp.get<DeviceGroupItemResult>({ url: `${Api.deviceGroup}/${id}` });
// }
export function getDeviceGroups(params: DeviceGroupGetParams) {
  return avatarHttp.get<DeviceGroupGetResult>({ url: Api.deviceGroup, params });
}
export function getAllDeviceGroups() {
  return avatarHttp.get<DeviceGroupGetResult>({
    url: Api.deviceGroup,
    params: { page: 1, size: 99999999 },
  });
}
export function postDeviceGroup(data: DeviceGroupItem) {
  return avatarHttp.post<DeviceGroupItemResult>({ url: Api.deviceGroup, data });
}
export function putDeviceGroup(id: string, data: DeviceGroupItem) {
  return avatarHttp.put<DeviceGroupItemResult>({ url: `${Api.deviceGroup}/${id}`, data });
}
export function delDeviceGroup(id: string) {
  return avatarHttp.delete({ url: `${Api.deviceGroup}/${id}` });
}
