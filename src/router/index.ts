import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TetrisView from "@/views/TetrisView.vue";
import MinesweeperView from "@/views/MinesweeperView.vue";
import TwentyFortyEightView from "@/views/TwentyFortyEightView.vue";
import SudokuViewVue from "@/views/SudokuView.vue";
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
    {
      path: "/minesweeper",
      name: "minesweeper",
      component: MinesweeperView,
    },
    {
      path: "/twenty-forty-eight",
      name: "twenty-forty-eight",
      component: TwentyFortyEightView,
    },
    {
      path: "/sudoku",
      name: "sudoku",
      component: SudokuViewVue,
    },
  ],
});

export default router;
