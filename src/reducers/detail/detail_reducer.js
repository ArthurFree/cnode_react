import Immutable from 'immutable';
import { GET_DETAIL } from 'actionType';

const initState = Immutable.fromJS({
    content: {},
});


export default function detailReducer(state = initState, action) {
    switch (action.type) {
        case 'GET_DETAIL':
            return getDetail(state, action.data);
        default:
            return initState;
    }
}

function getDetail(state, data) {
    return state.set('content', data);
}
