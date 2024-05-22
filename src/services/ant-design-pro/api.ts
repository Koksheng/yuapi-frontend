// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request  from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/getCurrentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/getCurrentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/userLogout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/userLogout', {
  // return request<API.BaseResponse<number>>('/api/authentication/Logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/userLogin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/userLogin', {
  // return request<API.BaseResponse<API.LoginResult>>('/api/authentication/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/userRegister */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/User/userRegister', {
  // return request<API.BaseResponse<API.RegisterResult>>('/api/authentication/Register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/searchUsers/ */
// export async function searchUsers(options?: { [key: string]: any }) {
//   return request<API.BaseResponse<API.CurrentUser>>('/api/user/searchUsers', {
//     method: 'GET',
//     ...(options || {}),
//     // data: body,
//     // ...(options || {}),
//   });
// }

export async function searchUsers(params: Record<string, any>, options?: { [key: string]: any }) {
  
  // console.log("before",params.userRole);
  // // if (params.userRole !== undefined) {
  // //   params.userRole = params.userRole == true ? 1 : 2;
  // // }
  // console.log("after",params.userRole);
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/searchUserList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/userRegister */
export async function updateUser(body: API.CurrentUser, options?: { [key: string]: any }) {
  // return request<API.BaseResponse<API.RegisterResult>>('/api/User/userRegister', {
  return request<API.BaseResponse<number>>('/api/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/deleteUser */
export async function deleteUser(id: number) {
  return request<API.BaseResponse<number>>(`/api/user/deleteUser?id=${id}`, {
    method: 'POST',
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
