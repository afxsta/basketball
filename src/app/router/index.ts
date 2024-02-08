import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  AuthPage,
  MainPage,
  TeamsPage,
  TeamPage,
  PlayerPage,
  PlayersPage,
  PlayerEditPage,
  TeamEditPage,
  NotFoundPage,
} from '@/pages'
import { useAuthStore } from '@/entities'
import { storeToRefs } from 'pinia'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
      {
        path: '',
        name: 'main',
        redirect: '/players',
        component: MainPage,
        children: [
          {
            path: 'players',
            name: 'players',
            component: PlayersPage,
          },
          {
            path: 'player/:id?',
            name: 'player',
            component: PlayerPage,
          },
          {
            path: 'teams',
            name: 'teams',
            component: TeamsPage,
          },
          {
            path: 'team/:id?',
            name: 'team',
            component: TeamPage,
          },
          {
            path: 'player-control/:id?',
            name: 'player-control',
            component: PlayerEditPage,
          },
          {
            path: 'team-control/:id?',
            name: 'team-control',
            component: TeamEditPage,
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const { user } = storeToRefs(useAuthStore())

  const isSignPage = to.name?.toString()?.includes('sign')
  if (!user.value) {
    if (!isSignPage) next({ name: 'sign-in' })
  } else {
    if (isSignPage || !to.name) next({ name: 'main' })
  }

  next()
})

const lessonRoute = routes[0]
export { lessonRoute }

export default router
