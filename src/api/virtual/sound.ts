import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import { AssetItem, ModelItem } from './model';
enum Api {
  sound = '/api/v1/avatar/sound',
  tts = '/api/v1/avatar/tts/synthesis',
  voice_type = '/api/v1/avatar/tts/voice/type',
}

export interface SoundItem {
  id: number;
  name: string;
  remark: string;
  tts_speed_rate: number;
  tts_volume: number;
  tts_voice_type: string;
  updated_at: number;
  created_at: number;
}
export type SoundItemResult = {
  id: string;
  name: string;
  remark: string;
  tts_speed_rate: number;
  tts_volume: number;
  tts_voice_type: string;
  models: ModelItem[];
  assets: Array<AssetItem>;
  created_at: string;
  updated_at: string;
};
export type SoundsGetParams = BasicPageParams & { s?: string; model?: string };
export type SoundsGetResult = BasicFetchResult<SoundItemResult>;
export function getSounds(params: SoundsGetParams) {
  return avatarHttp.get<SoundsGetResult>({ url: Api.sound, params });
}
export function getSound(id: string) {
  return avatarHttp.get<SoundItemResult>({ url: `${Api.sound}/${id}` });
}
export function postSound(data: SoundItem) {
  return avatarHttp.post<SoundItemResult>({ url: Api.sound, data });
}
export function putSound(id: string, data: SoundItem) {
  return avatarHttp.put<SoundItemResult>({ url: `${Api.sound}/${id}`, data });
}
export function delSound(id: string) {
  return avatarHttp.delete({ url: `${Api.sound}/${id}` });
}

export type SynthesisResponse = string;
export const getSynthesis = (data: any) => {
  return avatarHttp.post<SynthesisResponse>(
    { url: Api.tts, data },
    { isTransformResponse: false, loading: true },
  );
};

export type VoiceTypesResponse = { name: ''; key: '' }[];
export const getVoiceTypes = () => {
  return avatarHttp.get<VoiceTypesResponse>({ url: Api.voice_type });
};
