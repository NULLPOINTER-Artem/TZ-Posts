import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/PostComponent.vue';

const routes = [
    {
        path: '/:catchAll(.*)',
        component: () => import('./components/NotFoundComponent.vue'),
    },
    {
        path: '/',
        component: Home
    },
    {
        path: '/postForm',
        name: 'postForm',
        component: () => import('./components/PostFormComponent.vue'),
    },
    {
        path: '/posts',
        name: 'posts',
        component: () => import('./components/PostComponent.vue'),
    },
    {
        path: '/postDetails/:postId',
        name: 'postDetails',
        component: () => import('./components/PostDetailsComponent.vue'),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;