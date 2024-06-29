export default [
  
  { path: '/', name: 'Main', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: 'View Interface', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: 'Login', path: '/user/login', component: './User/Login' },
      { name: 'Register', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/user',
    routes: [{ name: 'Personal Info', path: '/user/personal_info', component: './User/PersonalInfo' }],
  },
  {
    path: '/admin',
    name: 'Management Page',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: 'Interface Management', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: 'Interface Analysis', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },
      { name: 'User Management', icon: 'analysis', path: '/admin/user_manage', component: './Admin/UserManage' },
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
      // { path: '/admin/user-manage', name: '用户管理', component: './Admin/UserManage' },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
