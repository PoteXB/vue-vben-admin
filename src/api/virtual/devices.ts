import { avatarHttp } from '/@/utils/http/axios';
import type { DeviceTypeItem } from '/@/api/virtual/deviceType';
import type { DeviceGroupItem } from '/@/api/virtual/deviceGroup';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
enum Api {
  device = '/api/v1/avatar/device',
}

export interface ISimpleDevice {
  name: string;
  code: string;
  remark: string;
  device_type_id: number;
  device_group_id: number;
  serial_no: string;
  mac_address: string;
  version_software: string;
  version_hardware: string;
  position: string;
}

export interface IDetailedDevice {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  code: string;
  remark: string;
  device_type: DeviceTypeItem;
  device_group: DeviceGroupItem;
  serialNo: string;
  macAddress: string;
  versionSoftware: string;
  versionHardware: string;
  position: string;
  last_seen_at: string;
}
export type DeviceGetParams = BasicPageParams & { deviceGroupId: string };
export type DeviceGetResult = BasicFetchResult<IDetailedDevice>;
export function getDevices(params: DeviceGetParams) {
  return avatarHttp.get<DeviceGetResult>({ url: Api.device, params });
}
export function getDevice(id: number) {
  return avatarHttp.get<IDetailedDevice>({ url: `${Api.device}/${id}` });
}
export function postDevice(data: ISimpleDevice) {
  return avatarHttp.post<IDetailedDevice>({ url: Api.device, data });
}
export function putDevice(id: number, data: ISimpleDevice) {
  return avatarHttp.put<IDetailedDevice>({ url: `${Api.device}/${id}`, data });
}
export function delDevice(id: number) {
  return avatarHttp.delete({ url: `${Api.device}/${id}` });
}
