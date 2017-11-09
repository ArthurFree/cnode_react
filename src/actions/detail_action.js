import { GET_DETAIL } from 'actionType';
import utils from 'utils';

/**
 * 获取详情
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getDetail(params) {
    return (dispatch) => {
        return utils.ajax({
            url: `/topic/${params.id}`,
            dispatch,
            actionType: GET_DETAIL
        });
    }
}
