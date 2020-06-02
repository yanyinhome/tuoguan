import CommonService from "./common_api";
import service, {postBody, request} from '../utils/bd_request';

export default {

    /* 特色产品 */
    getProductList: CommonService.productList,

    /**
     * 研究精华
     * @param success
     * @param fail
     * @param params
     */
    researchList: function (success, fail, params) {
        request('get','/api','/customer/resea/tReportInfo/researchList',params,success,fail);
    }
}

