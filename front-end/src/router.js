import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Pm76 from './views/Pm76.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import User from './views/User.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/words',
            name: 'words',
            component: Words,
            meta: { requiresAuth: true }
        },
        {
            path: '/words/new',
            name: 'new-word',
            component: New,
            meta: { requiresAuth: true }
        },
        {
            path: '/words/:id',
            name: 'show',
            component: Show,
            meta: { requiresAuth: true }
        },
        {
            path: '/words/:id/edit',
            name: 'edit',
            component: Edit,
            meta: { requiresAuth: true }
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
            meta: { requiresAuth: true }
        },
        { 
            path: '/pm76',
            name: 'PM76',
            component: Pm76,
            meta: { requiresAuth: true }
        },
        { 
            path: '/user',
            name: 'User',
            component: User,
            meta: { requiresAuth: true }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
