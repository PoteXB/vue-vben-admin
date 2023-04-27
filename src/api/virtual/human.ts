import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import { DeviceGroupItem } from './deviceGroup';
import { SoundItem } from './sound';
enum Api {
  human = '/api/v1/avatar/virtual/human',
}

export interface HumanItem {
  model_id?: number;
  sound_id?: number;
  device_type_id?: number;
  device_group_id?: number;
  mac_address?: string;
  position?: string;
  remark?: string;
  skill_ids?: number[];
  faq_ids?: number[];
  iot_gateway_id?: number;
  sub_devices?: {
    id: string;
    mac_address: string;
    device_type_id: number;
    remark: string;
  }[];
}
export type HumanItemResult = HumanItem & {
  id: number;
  name: string;
  skills: any;
  faqs: any;
  virtual_model: {
    id: number;
    name: string;
    remark: string;
    preview_url: string;
  };
  serial_no: string;
  media_types: number[];
  device_type: string;
  status: number;
  version_software: string;
  version_hardware: string;
  created_at: string;
  updated_at: string;
  sound: SoundItem;
  device_group: DeviceGroupItem;
};
export type HumansGetParams = BasicPageParams & { s?: string };
export type HumansGetResult = BasicFetchResult<HumanItemResult>;
export function getHumans(params: HumansGetParams) {
  return avatarHttp.get<HumansGetResult>({ url: Api.human, params });
}
export function getHuman(id: string) {
  return avatarHttp.get<HumanItemResult>({ url: `${Api.human}/${id}` }, { loading: true });
}
export function postHuman(data: HumanItem) {
  return avatarHttp.post<HumanItemResult>(
    { url: Api.human, data },
    { loading: { type: 'card', tip: '正在配置虚拟人...' } },
  );
}
export function putHuman(id: string, data: HumanItem) {
  return avatarHttp.put<HumanItemResult>(
    { url: `${Api.human}/${id}`, data },
    { loading: { type: 'card', tip: '正在配置虚拟人...' } },
  );
}
export function patchHuman(id: string, data: HumanItem) {
  return avatarHttp.patch<HumanItemResult>(
    { url: `${Api.human}/${id}`, data },
    { loading: { type: 'card', tip: '正在配置虚拟人...' } },
  );
}
export function delHuman(id: string) {
  return avatarHttp.delete({ url: `${Api.human}/${id}` }, { successMsg: '删除虚拟人成功' });
}
export function checkDiff(id: string) {
  return avatarHttp.get<{ ids: string[] }>({ url: `${Api.human}/${id}/diff` });
}
export function batchPatchHuman(id: string, data: { ids: string[] }) {
  return avatarHttp.patch<{}>({ url: `${Api.human}/${id}/diff`, data });
}
export function resetHuman(id: string) {
  return avatarHttp.post<''>({ url: `${Api.human}/${id}/reset` });
}
export function cloneHuman(id: number) {
  return avatarHttp.post<''>({ url: `${Api.human}/${id}/clone` }, { successMsg: '复制虚拟人成功' });
}
