import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistrasion from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach
        }
      ]
    },
    {
      path: '/register',
      component: CoachRegistrasion,
      meta: { requireAuth: true }
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requireAuth: true }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    },
    {
      path: '/login',
      component: UserAuth,
      meta: { requireUnauth: true }
    }
  ]
});

router.beforeEach(function(to, _, next){
  if(to.meta.requireAuth && !store.getters.isAuthenticated){
    next('/login');
  }else if(to.meta.requireUnauth && store.getters.isAuthenticated){
    next('/coaches')
  }else{
    next();
  }
})

export default router;