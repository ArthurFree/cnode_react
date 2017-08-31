import React, { Component } from 'react';
import { Route, BrowserRouter, HashRouter, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import { getRoute, asyncComponent, asyncComponent2 } from './core';

const history = createHistory();

export default class AppRouter extends Component {
    render() {
        const rootPath = '../views';
        // 主要业务模块路由
        const rootRoute = {
            path: '/',
            component: asyncComponent(() => import('../views/layout_view.js')),
            routes: [
                {
                    path: '/demo/list',
                    component: asyncComponent(() => import('../views/demo/list.js'))
                },
                {
                    path: '/demo/detail',
                    component: asyncComponent(() => import('../views/demo/detail.js'))
                }
            ]
        };
        // 其他部分模块路由
        const otherRoutes = [
            {
                path: '/login',
                component: asyncComponent(() => import('../views/login/index.js'))
            }
        ];
        const routesJSX = this.generateRoutes(rootRoute);
        const otherRoutesJSX = this.generateOtherRoutes(otherRoutes);

        return (
            <HashRouter exact>
                <div>
                    <Switch>
                        {otherRoutesJSX}
                        {routesJSX}
                    </Switch>
                </div>
            </HashRouter>
        )
    }
    // 生成业务路由
    generateRoutes(route) {
        let _route = [];
        route.routes.map((route, index) => {
            _route.push(
                <Route key={index} path={route.path} exact render={props => <route.component {...props} />}></Route>
            )
        });
        return (
            <route.component {...this.props}>
                {_route}
            </route.component>
        )
    }

    // 生成其他路由
    generateOtherRoutes(routes) {
        let _otherRoute = [];
        routes.map((item, index) => {
            _otherRoute.push(
                <Route key={index} path={item.path} exact render={props => <item.component {...props} />}></Route>
            )
        });

        return _otherRoute;
    }
}
