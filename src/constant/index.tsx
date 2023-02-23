import { ReactNode } from 'react';
import Learn from "@/pages/Learn";
import NotFound from "@/pages/NotFound";
import Store from '@/pages/Store';
// import SignIn from "@/pages/SignIn";
interface TypeRoute {
    path: string;
    element: ReactNode;
}
interface TypeRoutes extends Array<TypeRoute> { }
export const routeAuth: TypeRoutes = [
    {
        path: '/learn',
        element: <Learn />
    },
    {
        path: '/store',
        element: <Store />
    },
    {
        path: '*',
        element: <NotFound />
    }
]
export const api ={
    users:{
        getAll:'get/user',
        register:'post/user',
        update:'update/user',
        delete:'delete/user',
    },
    auth:{
        login:'/login'
    }
}