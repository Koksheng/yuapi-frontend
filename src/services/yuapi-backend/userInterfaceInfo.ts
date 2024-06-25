// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/UserInterfaceInfo/addUserInterfaceInfo */
export async function postUserInterfaceInfoAddUserInterfaceInfo(
  body: API.CreateUserInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/UserInterfaceInfo/addUserInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/UserInterfaceInfo/deleteUserInterfaceInfo */
export async function postUserInterfaceInfoDeleteUserInterfaceInfo(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/UserInterfaceInfo/deleteUserInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/UserInterfaceInfo/getUserInterfaceInfoById */
export async function getUserInterfaceInfoGetUserInterfaceInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoGetUserInterfaceInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.UserInterfaceInfoSafetyResponseBaseResponse>(
    '/api/UserInterfaceInfo/getUserInterfaceInfoById',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/UserInterfaceInfo/listUserInterfaceInfo */
export async function getUserInterfaceInfoListUserInterfaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoListUserInterfaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.UserInterfaceInfoSafetyResponseListBaseResponse>(
    '/api/UserInterfaceInfo/listUserInterfaceInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/UserInterfaceInfo/listUserInterfaceInfoByPage/list/page */
export async function getUserInterfaceInfoListUserInterfaceInfoByPageListPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoListUserInterfaceInfoByPageListPageParams,
  options?: { [key: string]: any },
) {
  return request<API.UserInterfaceInfoSafetyResponsePaginatedListBaseResponse>(
    '/api/UserInterfaceInfo/listUserInterfaceInfoByPage/list/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/UserInterfaceInfo/updateUserInterfaceInfo */
export async function postUserInterfaceInfoUpdateUserInterfaceInfo(
  body: API.UpdateUserInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/UserInterfaceInfo/updateUserInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
