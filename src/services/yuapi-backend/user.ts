// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/User/getCurrentUser */
export async function getUserGetCurrentUser(options?: { [key: string]: any }) {
  return request<API.UserSafetyResponseBaseResponse>('/api/User/getCurrentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/User/userLogin */
export async function postUserUserLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.UserSafetyResponseBaseResponse>('/api/User/userLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/User/userLogout */
export async function postUserUserLogout(options?: { [key: string]: any }) {
  return request<API.Int32BaseResponse>('/api/User/userLogout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/User/userRegister */
export async function postUserUserRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int32BaseResponse>('/api/User/userRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
