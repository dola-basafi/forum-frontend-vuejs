import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import QuestionCreate from '../views/question/Create.vue';
import Dashboard from '../views/Dashboard.vue';
import {useGlobal} from '../stores/global';
import OwnQuestion from '../views/question/OwnQuestion.vue';
import { storeToRefs } from 'pinia';
import Post from '../views/question/Post.vue';
import Edit from '../views/question/Edit.vue';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: {name: 'dashboard'}
    },
    {
      path: '/question/edit',
      name: 'question-edit',
      component: Edit,
      meta: { checkLogin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { checkLogin: false },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { checkLogin: false },
    },
    {
      path: '/question/create',
      name: 'question-create',
      component: QuestionCreate,
      meta: { checkLogin: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { checkLogin: false },
    },
    {
      path: '/question/own',
      name: 'question-own',
      component: OwnQuestion,
      meta: { checkLogin: true },
    },
    {
      path: '/question/post/:id',
      name: 'question-post',
      component: Post,
      meta: { checkLogin: false },
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})
router.beforeEach((to,from)=>{
  const {isAuthenticated} = storeToRefs(useGlobal())
  if(to.meta.checkLogin && !isAuthenticated.value){
    useGlobal().setAlertMsg({ messages: ['anda belum login, silahkan login terlebih dahulu'], status: 2 })
    return {
      path:'/login'
    }
  }
})
export default router
