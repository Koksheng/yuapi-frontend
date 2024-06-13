declare namespace API {
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

  type DeleteInterfaceInfoRequest = {
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
    status?: number;
    method?: string;
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
