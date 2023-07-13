import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TetrisView from "@/views/TetrisView.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tetris",
      name: "tetris",
      component: TetrisView,
    },
  ],
});

export default router;
