import Immutable from 'immutable';
import { GET_LIST } from 'actionType';

const initState = Immutable.fromJS({
    list: [],
});


export default function listReducer(state = initState, action) {
    switch (action.type) {
        case 'GET_LIST':
            return getList(state, action.data);
        default:
            return initState;
    }
}

function getList(state, data) {
    let list = state.get('list');
    list = list.concat(data);

    return state.set('list', list);
}
