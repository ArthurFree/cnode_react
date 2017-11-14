import createHistory from 'history/createHashHistory';
import * as React from 'react';
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from './core';

const history = createHistory();

interface RouteItem {
    path: string;
    component: any;
}

interface RouteList {
    path: string;
    component: any;
    routes: RouteItem[];
}

export default class AppRouter extends React.Component<any, any> {
    public render() {
        const rootPath = '../views';
        // 主要业务模块路由
        const rootRoute: RouteList = {
            component: asyncComponent(() => import('../views/layout_view')),
            path: '/',
            routes: [
                {
                    component: asyncComponent(() => import('../views/demo/list_view')),
                    path: '/demo/list'
                }
                // ,
                // {
                //     path: '/demo/detail',
                //     component: asyncComponent(() => import('../views/demo/detail.js'))
                // },
                // {
                //     path: '/list/:tab',
                //     component: asyncComponent(() => import('../views/list/list_view.js'))
                // },
                // {
                //     path: '/',
                //     component: asyncComponent(() => import('../views/list/list_view.js'))
                // },
                // {
                //     path: '/list',
                //     component: asyncComponent(() => import('../views/list/list_view.js'))
                // },
                // {
                //     path: '/detail/:id',
                //     component: asyncComponent(() => import('../views/detail/detail_view.js'))
                // }
            ]
        };
        // 其他部分模块路由
        const otherRoutes: RouteItem[] = [
            // {
            //     path: '/login',
            //     component: asyncComponent(() => import('../views/login/index.js'))
            // },
            // {
            //     path: '/upload',
            //     component: asyncComponent(() => import('../views/upload/index.js'))
            // }
        ];
        const routesJSX = this.generateRoutes(rootRoute);
        const otherRoutesJSX = this.generateOtherRoutes(otherRoutes);

        return (
            <HashRouter>
                <div>
                    <Switch>
                        {otherRoutesJSX}
                        {routesJSX}
                    </Switch>
                </div>
            </HashRouter>
        );
    }
    // 生成业务路由
    public generateRoutes(root: any): any {
        const _route: any[] = [];
        root.routes.map((route: RouteItem, index: number) => {
            // if (index === 0) {
            //     _route.push(
            //         <Redirect key={index} path="/" to="/list/all" exact></Redirect>
            //     );
            // }
            _route.push(
                <Route
                    key={index + 1}
                    path={route.path}
                    exact={true}
                    render={(props) => <route.component {...props} />}
                />
            );
        });
        return (
            <root.component {...this.props}>
                {_route}
            </root.component>
        );
    }

    // 生成其他路由
    public generateOtherRoutes(routes: RouteItem[]) {
        const _otherRoute: any[] = [];
        routes.map((item, index) => {
            _otherRoute.push(
                <Route
                    key={index}
                    path={item.path}
                    exact={true}
                    render={(props) => <item.component {...props} />}
                />
            );
        });

        return _otherRoute;
    }
}
