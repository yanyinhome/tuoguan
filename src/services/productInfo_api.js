import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 产品详情-基础信息查询 */
    // @param {id:"",}
    findProduct: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/findProduct',params, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }
        })
    },
    /* 产品详情-账户信息查询 */
    // @param {id:"",}
    getAccount: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/getAccount',params, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }
        })
    },
    /* 产品详情-邮箱信息查询 */
    // @param {id:"",}
    getEmail: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/product/getEmail',params, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }
        })
    },
}
