import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 客户份额搜索 */
    // @param {productNo:"",dataType:"",cpId:""}
    // cpId为没有产品时的参数
    customerShareQuery: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/customer/share/search',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 客户份额查询*/
    // @param {productNo:"",taaccountid:""}
    shareLastList: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/customer/share/lastList',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 客户份额详情查询*/
    // @param {productNo:"",taaccountid:""}
    shareInfo: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/customer/share/info',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
}
