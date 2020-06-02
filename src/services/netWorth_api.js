import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 净值查询 */
    // @param {productNo:""}
    networthList: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/networth/list',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 净值查询图形展示接口 */
    // @param {productNo:""}
    networthListView: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/networth/list/view',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
}
