// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/Menus/CreateMenu */
export async function postMenusCreateMenu(
  body: API.CreateMenuRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/Menus/CreateMenu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
