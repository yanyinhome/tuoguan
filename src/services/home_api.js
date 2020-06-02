import CommonApi from './common_api';
import {request} from '../utils/bd_request';
import common_api from './common_api';

/* 首页数据加载 */
export default {

    // 产品列表
    getProductList:common_api.getProductList,
    // 产品总数
    // @param {cpId:""}
    productProductCount: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/productCount',params, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    // 首页产品列表
    // @param {cpId:"",productNo:""} 二选一
    getAllProduct: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/getAllProduct',params, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    // 首页新通知，新业务
    // @param {cpId:"allCompany",str：""} 二选一
    findNotice: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/notice/findNotice',params, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
}