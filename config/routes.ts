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
    name: 'Management Page',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: 'Interface Management', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: 'Interface Analysis', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
      // { path: '/admin/user-manage', name: '用户管理', component: './Admin/UserManage' },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
