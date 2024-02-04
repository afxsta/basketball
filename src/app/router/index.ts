import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthPage, SignInPage, SignUpPage } from '@/pages'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'auth',
    component: AuthPage,
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: SignInPage,
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: SignUpPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const lessonRoute = routes[0]
export { lessonRoute }

export default router
