import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers.js';

const rootReducer = combineReducers({
    routing: routerReducer,
    ...reducers,
});

export default rootReducer;