declare global {
    interface RouterMeta {
        title: string;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'
import question from '../views/question/question-list.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const surveyDetail = {
    path: '/surveyDetail',
    name: 'surveyDetail',
    component: () => import('../views/user-survey/user-survey-detail.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('../views/login.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu' },
    component: main,
    children: [
        { path: 'home', meta: { title: 'HomePage' }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
}

export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: 'İşlemler' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'user', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
        { path: 'role', permission: 'Pages.Roles', meta: { title: 'Roles' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
        { path: 'tenant', permission: 'Pages.Tenants', meta: { title: 'Tenants' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue') },
        { path: 'surveyHeaderList', permission: 'Pages.SurveyAdmin', meta: { title: 'Anket İşlemleri' }, name: 'surveyHeaderList', component: () => import('../views/survey/survey-header-list.vue') },
        { path: 'userSurveyList', meta: { title: 'Anketler' }, name: 'userSurveyList', component: () => import('../views/user-survey/user-survey-header.vue') },
        { path: 'questionList', meta: { title: 'Anketler Soruları' }, name: 'questionList', component: () => import('../views/question/question-list.vue') },
        { path: 'answerList', meta: { title: 'Anketler Sorularının Cevapları' }, name: 'answerList', component: () => import('../views/answers/answer-list.vue') },
        { path: 'surveyResultList', meta: { title: 'Anketler Cevapları' }, name: 'surveyResultList', component: () => import('../views/survey/survey-result-list.vue') }
        
    ]
}]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters,
    surveyDetail,
];
