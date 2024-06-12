export default [
  
  { path: '/', name: 'Main', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: 'View Interface', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
      // { path: '/admin/user-manage', name: '用户管理', component: './Admin/UserManage' },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
