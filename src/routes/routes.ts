import HomePage from '../pages/Home'
import LoginPage from '../pages//Auth/Login'
import RegisterPage from '../pages/Auth/Register'


interface IRoute {
    path: string;
    component: any;
    layout?: any;

}


 export const routes: IRoute[] = [
    {
        path: '/',
        component: HomePage

    },
    {
        path: '/login',
        component: LoginPage,
        layout: null

    },
    {
        path: '/register',
        component: RegisterPage,
        layout: null
    },
    {
        path: '*',
        component: HomePage
    }
]