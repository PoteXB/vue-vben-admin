import { defHttp, avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
enum Api {
  IOTGateway = '/v1/multimode/iot/gateway/page',
  IOTDevice = '/v1/multimode/iot/device/page',
  UpdateIOTGateway = '/v1/multimode/iot/gateway/sync',
}

export interface IOTItem {
  id: string;
  name: string;
  code: string;
}
export type GatewayItemResult = IOTItem & {
  last_updated: string;
  virtual_human_serial_no: string;
};
export type DeviceItemResult = IOTItem & {
  product_id: string;
  product_name: string;
  parent_id: string;
  functions?: {
    function_name: string;
    function_cmd_name: string;
    function_cmd_code: string;
  }[];
};
export type DeviceItemResultFormat = DeviceItemResult & {
  funcLength: number;
  function_name?: string;
  function_cmd_name?: string;
  function_cmd_code?: string;
};
type UpdateIOTDeviceResult = IOTItem & {
  virtual_human_serial_no: string;
};
export type GatewayGetParams = BasicPageParams & { s?: string };
export type GatewayGetResult = BasicFetchResult<GatewayItemResult>;
export type DeviceGetParams = BasicPageParams & { id: string };
export type DeviceGetResult = BasicFetchResult<DeviceItemResult>;

// 空间网关列表
export function getIOTGateway(params: GatewayGetParams) {
  return defHttp.get<GatewayGetResult>({
    url: Api.IOTGateway,
    params,
  });
}
// 设备列表
export function getIOTDevice({ id }: DeviceGetParams) {
  return avatarHttp.get<DeviceGetResult>({
    url: `/api/v1/avatar/device/type/${id}`,
  });
}
// 更新设备
export function updateIOTDevice(params: { corp_id: string | number | undefined }) {
  return defHttp.get<UpdateIOTDeviceResult[]>(
    {
      url: Api.UpdateIOTGateway,
      params,
      timeout: 60 * 1000, // 异步更新接口速度很慢，超时设置60s
    },
    { errorMessageMode: 'none' },
  );
}
