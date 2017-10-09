import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import reducer from '../reducers';

const history = createHistory();

const reduxRouterMiddleware = routerMiddleware(history);

const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxRouterMiddleware)
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
        module.hot.accept('reducers/index.js', () => {
            store.replaceReducer(require('reducers/index.js').default)
        });
    }
    return store;
}