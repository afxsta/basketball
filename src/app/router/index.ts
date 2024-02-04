import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthPage } from '@/pages'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: AuthPage,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: AuthPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const lessonRoute = routes[0]
export { lessonRoute }

export default router
