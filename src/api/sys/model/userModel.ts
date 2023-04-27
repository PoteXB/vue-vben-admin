import { getMenuListResultModel } from '/@/api/sys/model/menuModel';
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  name: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
  authInfo: any;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  nickname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  permission: getMenuListResultModel;
}
