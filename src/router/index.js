import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index'),
  },
  {
    path: '/tasks/:id',
    name: 'TasksID',
    component: () => import('@/views/tasks/_id'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'Test') {
    next();
    return;
  }
  const { data } = await axios.get('/api/user/isLogin');
  const status = data.data;
  console.log(status);
  if (status === '用户尚未登录') {
    if (to.name === 'Index' && to.query.noLogin) {
      next();
    } else {
      next({
        name: 'Index',
        query: { noLogin: 'true' },
      });
    }
  } else if (to.name === 'Index' && to.query.noLogin) {
    next({ name: 'Index' });
  } else {
    next();
  }
});

export default router;
