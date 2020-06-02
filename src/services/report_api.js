import service, {request} from '../utils/bd_request';
import common_api from "./common_api";
import bd_utils from "../utils/bd_utils";

export default {

    reportToken: common_api.reportToken,

    reportAddLike: common_api.addLike,

    reportDelLike: common_api.delLike,

    reportAddCollect: common_api.addCollect,

    reportDelCollect: common_api.delCollect,

    reportInfo: function (success, fail, params) {
        service('/api', '/customer/resea/tReportInfo/share', 'GET', params,
            function (result) {
                if (result.data) {
                    success(result.data);
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    },

    viewPdf: function (success, fail, body) {

        request('post', '/api', '/customer/resea/tReportInfo/outPDF', null, success, fail,
            {
                data: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json;"
                },
                responseType: "blob"
            },false)

        // postJson('/api', '/customer/resea/tReportInfo/outPDF', body,
        //     function (result) {
        //         success(result);
        //     },
        //     function (err) {
        //         if (fail !== null && typeof fail === "function") {
        //             fail(err);
        //         }
        //     })
    },

    /* 研报-我的关注列表 */
    myFollowOfReportList: function (success, fail, params) {
        params = bd_utils.checkPageParams(params);
        service('/api', '/customer/resea/tIndustriesClassTitle/myIndustriesList', 'GET', params,
            function (result) {
                if (result.data) {
                    success(result.data);
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    },

    /* 分析师-我的关注 */
    myFollowOfAuthorList: function (success, fail, params) {
        params = bd_utils.checkPageParams(params);
        params = bd_utils.checkPageParams(params);
        service('/api', '/customer/resea/tSysUser/myAuthorList', 'GET', params,
            function (result) {
                if (result.data) {
                    success(result.data);
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    }


}
