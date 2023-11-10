import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import MemberView from "@/views/MemberView.vue"
import BoardView from "@/views/BoardView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView
    },
  ]
})

export default router
