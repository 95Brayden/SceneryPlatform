import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/login')
  },
  { // 首页
    path: '/home',
    name: 'Home',
    component: () => import('../views/home')
  },
  { // 实时监测
    path: '/monitor',
    name: 'Monitor',
    component: () => import('../views/monitor')
  },
  { // 登录
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  }
];

/**
 * createWebHashHistory： hash版本的路由，就是路径里面含有#
 * createWebHistory: history的路由，路径里面不含有#
 */
const router = createRouter({
  history: createWebHashHistory(),  // hash路由模式
  // history: createWebHistory(),  // history路由模式
  routes
});

export default router;
