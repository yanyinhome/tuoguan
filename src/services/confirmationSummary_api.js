import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 确认汇总 */
    // @param {startTime:"",endTime:"",productNo:""}
    productShareList: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/share/list',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 确认汇总详情 */
    // @param {pageNo:"",pageSize:"",productNo:"",businesscodeAck:"","startTime","endTime"}
    customerShareDailyInfo: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/customer/share/dailyInfo',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
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
