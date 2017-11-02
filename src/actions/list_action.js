import { GET_LIST } from 'actionType';
import utils from 'utils';

/**
 * 获取信息列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getList(params) {
    return (dispatch) => {
        return utils.ajax({
            url: '/topics',
            params,
            dispatch,
            actionType: GET_LIST
        });
    }
}
