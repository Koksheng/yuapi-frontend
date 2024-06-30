declare namespace API {
  type AdminPageUserSafetyResponse = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
    token?: string;
  };

  type AdminPageUserSafetyResponsePaginatedList = {
    items?: AdminPageUserSafetyResponse[];
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
  };

  type AdminPageUserSafetyResponsePaginatedListBaseResponse = {
    code?: number;
    data?: AdminPageUserSafetyResponsePaginatedList;
    message?: string;
    description?: string;
  };

  type BooleanBaseResponse = {
    code?: number;
    data?: boolean;
    message?: string;
    description?: string;
  };

  type CreateInterfaceInfoRequest = {
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    method?: string;
  };

  type CreateMenuRequest = {
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
  };

  type CreateUserInterfaceInfoRequest = {
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
  };

  type DeleteInterfaceInfoRequest = {
    id?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getInterfaceInfoGetInterfaceInfoByIdParams = {
    id?: number;
  };

  type getInterfaceInfoListInterfaceInfoByPageListPageParams = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type getInterfaceInfoListInterfaceInfoParams = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type getUserInterfaceInfoGetUserInterfaceInfoByIdParams = {
    id?: number;
  };

  type getUserInterfaceInfoListUserInterfaceInfoByPageListPageParams = {
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type getUserInterfaceInfoListUserInterfaceInfoParams = {
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type getUserListUserByPageListPageParams = {
    id?: number;
    userName?: string;
    userAccount?: string;
    gender?: number;
    userRole?: string;
    isDelete?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type IdRequest = {
    id?: number;
  };

  type Int32BaseResponse = {
    code?: number;
    data?: number;
    message?: string;
    description?: string;
  };

  type InterfaceInfoSafetyResponse = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    createTime?: string;
    updateTime?: string;
  };

  type InterfaceInfoSafetyResponseBaseResponse = {
    code?: number;
    data?: InterfaceInfoSafetyResponse;
    message?: string;
    description?: string;
  };

  type InterfaceInfoSafetyResponseListBaseResponse = {
    code?: number;
    data?: InterfaceInfoSafetyResponse[];
    message?: string;
    description?: string;
  };

  type InterfaceInfoSafetyResponsePaginatedList = {
    items?: InterfaceInfoSafetyResponse[];
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
  };

  type InterfaceInfoSafetyResponsePaginatedListBaseResponse = {
    code?: number;
    data?: InterfaceInfoSafetyResponsePaginatedList;
    message?: string;
    description?: string;
  };

  type InterfaceInfoWithTotalNumResponse = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    createTime?: string;
    updateTime?: string;
    totalNum?: number;
  };

  type InterfaceInfoWithTotalNumResponseListBaseResponse = {
    code?: number;
    data?: InterfaceInfoWithTotalNumResponse[];
    message?: string;
    description?: string;
  };

  type InvokeInterfaceInfoRequest = {
    id?: number;
    userRequestParams?: string;
  };

  type StringBaseResponse = {
    code?: number;
    data?: string;
    message?: string;
    description?: string;
  };

  type UpdateInterfaceInfoRequest = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    method?: string;
  };

  type UpdateUserInterfaceInfoRequest = {
    id?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
  };

  type UpdateUserRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    isDelete?: number;
  };

  type UserDevKeyResponse = {
    accessKey?: string;
    secretKey?: string;
  };

  type UserDevKeyResponseBaseResponse = {
    code?: number;
    data?: UserDevKeyResponse;
    message?: string;
    description?: string;
  };

  type UserInterfaceInfoSafetyResponse = {
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserInterfaceInfoSafetyResponseBaseResponse = {
    code?: number;
    data?: UserInterfaceInfoSafetyResponse;
    message?: string;
    description?: string;
  };

  type UserInterfaceInfoSafetyResponseListBaseResponse = {
    code?: number;
    data?: UserInterfaceInfoSafetyResponse[];
    message?: string;
    description?: string;
  };

  type UserInterfaceInfoSafetyResponsePaginatedList = {
    items?: UserInterfaceInfoSafetyResponse[];
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
  };

  type UserInterfaceInfoSafetyResponsePaginatedListBaseResponse = {
    code?: number;
    data?: UserInterfaceInfoSafetyResponsePaginatedList;
    message?: string;
    description?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserSafetyResponse = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    token?: string;
  };

  type UserSafetyResponseBaseResponse = {
    code?: number;
    data?: UserSafetyResponse;
    message?: string;
    description?: string;
  };
}
