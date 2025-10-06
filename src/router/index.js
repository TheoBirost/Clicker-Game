import { createRouter, createWebHistory } from "vue-router";
import Start from "../components/Start.vue";
import Jeu from "../components/Jeu.vue";

const routes = [
    { path: "/", component: Start },
    { path: "/jeu", component: Jeu },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
