import { avatarHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import { ModelItem } from './model';
export enum Api {
  faqs = '/api/v1/avatar/faq',
  faqCategory = '/api/v1/avatar/faq/category',
  faqCategories = '/api/v1/avatar/faq/categories',
  faqUpdatesSummary = '/api/v1/avatar/faq/submit/current',
  faqUpdatesList = '/api/v1/avatar/faq/changes',
  submitFAQUpdates = '/api/v1/avatar/faq/submit',
  FAQPublish = '/api/v1/avatar/tenant/info/public/publish',
  FAQPublishStatus = '/api/v1/avatar/tenant/info/public/publish/current',
}

export interface FaqItem {
  name: string;
  actions: any;
  category_id?: number;
  models: ModelItem[];
}
export type FaqItemResult = FaqItem & {
  id: string;
  created_at: string;
  updated_at: string;
};
export type FaqsGetParams = BasicPageParams & { s?: string; category?: string };
export type FaqsGetResult = BasicFetchResult<FaqItemResult>;
export function getFaqs(params: FaqsGetParams) {
  return avatarHttp.get<FaqsGetResult>({ url: Api.faqs, params });
}
export function getFaq(id: string) {
  return avatarHttp.get<FaqItemResult>({ url: `${Api.faqs}/${id}` });
}
export function postFaq(data: FaqItem) {
  return avatarHttp.post<FaqItemResult>({ url: Api.faqs, data, params: {} }, { loading: true });
}
export function putFaq(id: string, data: FaqItem) {
  return avatarHttp.put<FaqItemResult>({ url: `${Api.faqs}/${id}`, data }, { loading: true });
}
export function putFaqGroup(categoryID: number, data: { faq_ids: number[] }) {
  return avatarHttp.put<FaqItemResult>({ url: `${Api.faqCategory}/${categoryID}`, data });
}
export function delFaq(id: string) {
  return avatarHttp.delete({ url: `${Api.faqs}/${id}` });
}

export interface FaqCategoryItem {
  name: string;
}
export type FaqCategoryItemResult = FaqCategoryItem & {
  id: string;
  knowledgeCnt: number;
  created_at: string;
  updated_at: string;
};
export type FaqCategoriesGetResult = FaqCategoryItemResult[];
export function getFaqCategories() {
  return avatarHttp.get<FaqCategoriesGetResult>({ url: Api.faqCategory });
}
export function postFaqCategory(data: FaqCategoryItem) {
  return avatarHttp.post<FaqCategoryItemResult>({ url: Api.faqCategory, data });
}
export function putFaqCategory(id: string, data: FaqCategoryItem) {
  return avatarHttp.put<FaqCategoryItemResult>({
    url: `${Api.faqCategory}/${id}`,
    data,
  });
}
export function delFaqCategory(id: string) {
  return avatarHttp.delete({ url: `${Api.faqCategory}/${id}` });
}

// 问答更新管理 - 更新列表
export function getFaqUpdatesSummary() {
  return avatarHttp.get<{ faqAddCnt: number; faqUpdateCnt: number; faqDelCnt: number }>({
    url: Api.faqUpdatesSummary,
  });
}
// 问答更新管理 - 更新列表
export function getFaqUpdatesList(params: FaqsGetParams) {
  return avatarHttp.get<{ faqAddCnt: number; faqUpdateCnt: number; faqDelCnt: number }>({
    url: Api.faqUpdatesList,
    params,
  });
}
// 问答更新管理 - 确认更新
export function submitFAQUpdates() {
  return avatarHttp.post<FaqItemResult>(
    { url: Api.submitFAQUpdates, timeout: 60 * 1000 },
    { errorMessageMode: 'none', loading: { type: 'card', tip: '开始更新问答库' } },
  );
}
// 问答更新管理 - 获取更新发布状态
export function getPublishStatus() {
  return avatarHttp.get<{ status: 0 | 10 | 20 }>({ url: Api.FAQPublishStatus });
}
// 问答更新管理 - 发布更新
export function publishFAQUpdates() {
  return avatarHttp.post<FaqItemResult>(
    { url: Api.FAQPublish },
    { errorMessageMode: 'none', loading: { type: 'card', tip: '开始发布问答库' } },
  );
}
