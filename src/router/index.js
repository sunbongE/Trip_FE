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
      path: '/member',
      name: 'member',
      component: MemberView,
      children: [
        {
          path: "join",
          name:"join",
          component: ()=> import("@/components/member/MemberJoinView.vue")
        },
        {
          path: "login",
          name:"login",
          component: ()=> import("@/components/member/MemberLoginView.vue")
        },
        {
          path: "findid",
          name:"findid",
          component: ()=> import("@/components/member/MemberFindIdView.vue")
        },
        {
          path: "findpw",
          name:"findpw",
          component: ()=> import("@/components/member/MemberFindPwView.vue")
        },
        
      ]
    },
    {
      path: "/board",
      name: "board",
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
    {
      path: "/QnA",
      name: "QnA",
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/QnAView.vue"),
      redirect: { name: "QnA-list" },
      children: [
        {
          path: "list",
          name: "QnA-list",
          component: () => import("@/components/QnA/QnAList.vue"),
        },
        {
          path: "view/:QnAno",
          name: "QnA-view",
          component: () => import("@/components/QnA/QnADetail.vue"),
        },
        {
          path: "write",
          name: "QnA-write",
          component: () => import("@/components/QnA/QnAWrite.vue"),
        },
        {
          path: "modify/:QnAno",
          name: "QnA-modify",
          component: () => import("@/components/QnA/QnAModify.vue"),
        },
      ],
    },
  ]
})

export default router
