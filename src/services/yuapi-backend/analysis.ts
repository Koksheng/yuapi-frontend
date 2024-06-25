// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/Analysis/listTopInvokeInterfaceInfo */
export async function getAnalysisListTopInvokeInterfaceInfo(options?: { [key: string]: any }) {
  return request<API.InterfaceInfoWithTotalNumResponseListBaseResponse>(
    '/api/Analysis/listTopInvokeInterfaceInfo',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
