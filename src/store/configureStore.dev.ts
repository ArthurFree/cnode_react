import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const history = createHistory();

const reduxRouterMiddleware = routerMiddleware(history);

// const finalCreateStore = compose(
//     applyMiddleware(thunk),
//     applyMiddleware(reduxRouterMiddleware)
// )(createStore);

export default function configureStore(initialState: any): any {
    // const store = finalCreateStore(reducer, initialState);
    const store: any = createStore(
        reducer,
        initialState,
        applyMiddleware(reduxRouterMiddleware, thunk)
    );

    if (module.hot) {
        module.hot.accept('../reducers/index.ts', () => {
            store.replaceReducer(require('../reducers/index.ts').default);
        });
    }
    return store;
}
