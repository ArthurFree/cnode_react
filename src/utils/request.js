import axios from 'axios';

// 接口基础地址
const BASE_URL = 'https://cnodejs.org/api/v1';
/**
 * 请求接口通用函数
 *
 * @param {Object} config
 * config参数说明：
 *      url - 接口具体地址
 *      method - 请求方法
 *      params - GET 请求参数
 *      data - POST/PUT/PATCH 请求结构体参数
 *      transformRequest - 在发送请求之前改变数据
 *      transformResponse - 改变接受数据
 *      actionType - action type
 *      dispatch - redux dispatch
 * @returns
 */
function ajax(config) {
    let axiosInstance = axios.create({
        // 接口基础地址
        baseURL: BASE_URL,
        // 接口请求方法
        method: 'get',
        // 请求超时时间限制
        timeout: 5000,
        // 使用 cross-site Access-Control 请求设置
        withCredentials: false,
        // response 的数据类型，可选参数: arraybuffer, blob, document, json, text, stream
    });

    axiosInstance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(function (response) {
        let config = response.config;
        if (config.dispatch && config.actionType && response.data.success) {
            config.dispatch({
                type: config.actionType,
                data: response.data.data
            });
        }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });

    return axiosInstance.request(config);
}

export default ajax;
