import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import MemberView from "@/views/MemberView.vue"
// import BoardView from "@/views/BoardView.vue"
// import QnAView from "@/views/QnAView.vue"
// import BoardList from "@/components/board/BoardList.vue"
import TourView from "@/views/TourView.vue"
// import QnAList from "@/components/QnA/QnAList.vue"

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tour',
      name: 'tour',
      component: TourView
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView,
      redirect: { name: "login" },
      children: [
        {
          path: "join",
          name: "join",
          component: () => import("@/components/member/MemberJoinView.vue")
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/components/member/MemberLoginView.vue")
        },
        {
          path: "findid",
          name: "findid",
          component: () => import("@/components/member/MemberFindIdView.vue")
        },
        {
          path: "findpw",
          name: "findpw",
          component: () => import("@/components/member/MemberFindPwView.vue")
        },
        {
          path: "mypage",
          name: "mypage",
          component: () => import("@/components/member/MemberMyPageView.vue"),
          redirect: { name: "mypage-info" },
          children: [
            {
              path: "info",
              name: "mypage-info",
              component: () => import("@/components/member/mypage/MyPageInfo.vue")
            },
            {
              path: "plan",
              name: "mypage-plan",
              component: () => import("@/components/member/mypage/MyPagePlan.vue")
            },
            {
              path: "club",
              name: "mypage-club",
              component: () => import("@/components/member/mypage/MyPageClub.vue")
            },
            {
              path: "friendship",
              name: "mypage-friendship",
              component: () => import("@/components/member/mypage/MyPageFriendShip.vue")
            },
            {
              path: "alarm",
              name: "mypage-alarm",
              component: () => import("@/components/member/mypage/MyPageAlarm.vue")
            },

          ]
        }
      ]
    },
    {
      path: "/board",
      name: "board",
      // component: BoardView,
      component: () => import("@/views/BoardView.vue"),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",

          component: () => import("@/components/board/BoardList.vue"),
          // component: BoardList
        },
        {
          path: "view/:articleno",
          name: "article-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          beforeEnter: onlyAuthUser,
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
      // component: QnAView,
      component: () => import("@/views/QnAView.vue"),
      redirect: { name: "QnA-list" },
      children: [
        {
          path: "list",
          name: "QnA-list",
          // component: QnAList,
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
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/QnA/QnAWrite.vue"),
        },
        {
          path: "modify/:QnAno",
          name: "QnA-modify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/QnA/QnAModify.vue"),
        },
      ],
    },
  ]
})

export default router
