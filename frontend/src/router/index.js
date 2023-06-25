import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/account',
      name: 'account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AccountView.vue')
    }
  ]
});
let Parse = null;
router.beforeEach((to, from, next) => {
  const user = Parse.User.current();
  if ( to.name !== 'home' && !user ){
    next({
      name: 'home',
      replace: true
    })
  } if ( to.name !== 'account' && user ){
    next({
      name: 'account',
      replace: true
    })
  } else {
    next();
  }
  // return false
});

export const getRouter = (_parse) => {
  Parse = _parse;
  return router
}
