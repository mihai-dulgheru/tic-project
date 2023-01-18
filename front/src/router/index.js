import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const CoachDetail = () => import("@/views/coaches/CoachDetail.vue");
const CoachRegistration = () => import("@/views/coaches/CoachRegistration.vue");
const CoachesList = () => import("@/views/coaches/CoachesList.vue");
const ContactCoach = () => import("@/views/requests/ContactCoach.vue");
const NotFound = () => import("@/views/NotFound.vue");
const RequestsReceived = () => import("@/views/requests/RequestsReceived.vue");
const UserAuth = () => import("@/views/auth/UserAuth.vue");
const UserProfile = () => import("@/views/profile/UserProfile.vue");

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", name: "coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  {
    path: "/register",
    component: CoachRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: "/requests",
    component: RequestsReceived,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, _from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  }
  next();
});

export default router;
