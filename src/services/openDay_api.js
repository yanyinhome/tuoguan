import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 开放日历史查询 */
    // @param {productNo:""}
    findBeforeOpenTmpe: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/findBeforeOpenTmpe',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 开放日未来查询 */
    // @param {productNo:""}
    findAfterOpenTmpe: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/findAfterOpenTmpe',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
}
