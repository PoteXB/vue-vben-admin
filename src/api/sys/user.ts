import { defHttp } from '/@/utils/http/axios';
import { dialogBackendHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/v1/user/info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  Regist = '/v1/user/regist',
}

export function getLoginKeys() {
  return dialogBackendHttp.get<{ public_key: string }>({ url: `${Api.Login}/keys` });
}
/**
 * @description: user login api
 */
export function loginApi(data: LoginParams, mode: ErrorMessageMode = 'modal') {
  return dialogBackendHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export type RegistParams = LoginParams & {};

export function regist(params: RegistParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Regist,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
