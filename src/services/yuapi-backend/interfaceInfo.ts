// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/InterfaceInfo/addInterfaceInfo */
export async function postInterfaceInfoAddInterfaceInfo(
  body: API.CreateInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/InterfaceInfo/addInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/InterfaceInfo/deleteInterfaceInfo */
export async function postInterfaceInfoDeleteInterfaceInfo(
  body: API.DeleteInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/InterfaceInfo/deleteInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/InterfaceInfo/getInterfaceInfoById */
export async function getInterfaceInfoGetInterfaceInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoGetInterfaceInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.InterfaceInfoSafetyResponseBaseResponse>(
    '/api/InterfaceInfo/getInterfaceInfoById',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/InterfaceInfo/invokeInterfaceInfo */
export async function postInterfaceInfoInvokeInterfaceInfo(
  body: API.InvokeInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.StringBaseResponse>('/api/InterfaceInfo/invokeInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/InterfaceInfo/listInterfaceInfo */
export async function getInterfaceInfoListInterfaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoListInterfaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.InterfaceInfoSafetyResponseListBaseResponse>(
    '/api/InterfaceInfo/listInterfaceInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/InterfaceInfo/listInterfaceInfoByPage/list/page */
export async function getInterfaceInfoListInterfaceInfoByPageListPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoListInterfaceInfoByPageListPageParams,
  options?: { [key: string]: any },
) {
  return request<API.InterfaceInfoSafetyResponsePaginatedListBaseResponse>(
    '/api/InterfaceInfo/listInterfaceInfoByPage/list/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/InterfaceInfo/offlineInterfaceInfo */
export async function postInterfaceInfoOfflineInterfaceInfo(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BooleanBaseResponse>('/api/InterfaceInfo/offlineInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/InterfaceInfo/onlineInterfaceInfo */
export async function postInterfaceInfoOnlineInterfaceInfo(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BooleanBaseResponse>('/api/InterfaceInfo/onlineInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/InterfaceInfo/updateInterfaceInfo */
export async function postInterfaceInfoUpdateInterfaceInfo(
  body: API.UpdateInterfaceInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/InterfaceInfo/updateInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
