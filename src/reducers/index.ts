import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import reducers from './reducers';

const rootReducer = combineReducers({
    router: routerReducer,
    ...reducers,
});

export default rootReducer;
