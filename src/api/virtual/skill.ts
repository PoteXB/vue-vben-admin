import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
export enum Api {
  skills = '/api/v1/avatar/skill',
}

export interface SkillItem {
  name: string;
  remark: string;
  model_ids: number[];
  type: number;
}
export type SkillItemResult = SkillItem & {
  id: number;
  dp_skill_name: string;
  models: {
    cover_url: string;
    id: number;
    name: string;
  }[];
  created_at: string;
  updated_at: string;
};
export type SkillsGetParams = BasicPageParams & { s?: string; model?: string };
export type SkillsGetResult = BasicFetchResult<SkillItemResult>;
export function getSkills(params: SkillsGetParams) {
  return avatarHttp.get<SkillsGetResult>({ url: Api.skills, params });
}
export function getSkill(id: string) {
  return avatarHttp.get<SkillItemResult>({ url: `${Api.skills}/${id}` });
}
export function putSkill(id: string, data: SkillItem) {
  return avatarHttp.put<SkillItemResult>({ url: `${Api.skills}/${id}`, data });
}
