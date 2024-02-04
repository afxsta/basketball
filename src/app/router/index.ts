import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthPage } from '@/pages'
import { useAuthStore } from '@/entities'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'sign-in',
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: AuthPage,
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: AuthPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userData = localStorage['auth-store']?.user
  if (!userData && !to.name?.toString()?.includes('sign')) {
    next({ name: 'sign-in' })
  }

  next()
})

const lessonRoute = routes[0]
export { lessonRoute }

export default router
