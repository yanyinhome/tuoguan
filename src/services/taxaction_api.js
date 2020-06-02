import {request} from '../utils/bd_request';
import common_api from "./common_api";

export default {

    getProductList: common_api.getProductList,

    /* 税费查询 */
    // @param {id:"",dataType:"",cpId:""}
    // cpId为没有产品时的参数
    getOneProductTaxfee: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/taxfee/getOneProductTaxfee',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
    /* 税费查询 通用*/
    // @param {id:"",dataType:"",cpId:""}
    // cpId为没有产品时的参数
    getproductTaxfee: function (success, fail, params) {
        request('post','/api', '/institution/tgpt/taxfee/getproductTaxfee',null, success,fail,{
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
        }})
    },
}
