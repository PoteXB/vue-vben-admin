import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
enum Api {
  deviceTypes = '/api/v1/avatar/device/type',
}

interface DeviceFunction {
  function_name: string;
  instruction_name: string;
  instruction_code: string;
}

export interface DeviceTypeItem {
  name: string;
  device_roles: number[];
  media_types: number[];
  device_functions: DeviceFunction[];
}
export type DeviceTypeItemResult = DeviceTypeItem & {
  id: number;
  created_at: string;
  updated_at: string;
};
export type DeviceRoles = '1' | '2' | '1,2';
export type DeviceTypesGetParams = BasicPageParams & { deviceRoles?: string };
export type DeviceTypesGetResult = BasicFetchResult<DeviceTypeItemResult>;
export function getDeviceType(id: string) {
  return avatarHttp.get<DeviceTypeItemResult>({ url: `${Api.deviceTypes}/${id}` });
}
export function getDeviceTypes(params: DeviceTypesGetParams) {
  return avatarHttp.get<DeviceTypesGetResult>({ url: Api.deviceTypes, params });
}
export function getAllDeviceTypes(deviceRoles?: DeviceRoles) {
  return avatarHttp.get<DeviceTypesGetResult>({
    url: Api.deviceTypes,
    params: { deviceRoles, page: 1, size: 99999999 },
  });
}
export function postDeviceType(data: DeviceTypeItem) {
  return avatarHttp.post<DeviceTypeItemResult>({ url: Api.deviceTypes, data });
}
export function putDeviceType(id: string, data: DeviceTypeItem) {
  return avatarHttp.put<DeviceTypeItemResult>({ url: `${Api.deviceTypes}/${id}`, data });
}
export function delDeviceType(id: string) {
  return avatarHttp.delete({ url: `${Api.deviceTypes}/${id}` });
}
