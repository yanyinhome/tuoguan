import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 募集户流水查询 */
    // @param {id:"",dataType:"",cpId:""}
    // cpId为没有产品时的参数
    raiseRunQuery: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/runquery/raiseRunQuery',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 托管户流水查询 */
    // @param {id:"",dataType:"",cpId:""}
    // cpId为没有产品时的参数
    hostRunQuery: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/runquery/hostRunQuery',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
}
