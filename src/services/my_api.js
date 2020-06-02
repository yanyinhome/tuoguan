import service from '../utils/bd_request';

export default {

    /* 我的收藏————研报列表 */
    myCollectionsReportList: function (success, fail, params) {
        service('/api', '/customer/resea/tReportInfo/myReportCollectList', 'GET', params,
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
    /* 我的收藏————速评列表 */
    myCollectionsRemarkList: function (success, fail, params) {
        service('/api', '/customer/resea/tActivity/myActivityCollectList', 'GET', params,
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
    /* 我的收藏————产品列表 */
    myCollectionsProductsList: function (success, fail, params) {
        console.log(params)
        service('/api', '/customer/resea/tDataProductInfo/myProductCollectList', 'GET', params,
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

    /*===========================================================================================================================================================*/

    /* 我的点赞————研报列表 */
    myLikeReportList: function (success, fail, params) {
        service('/api', '/customer/resea/tReportInfo/myReportList', 'GET', params,
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
    /* 我的点赞————速评列表 */
    myLikeRemarkList: function (success, fail, params) {
        service('/api', '/customer/resea/tActivity/myActivityList', 'GET', params,
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
    /* 我的点赞————产品列表 */
    myLikeProductsList: function (success, fail, params) {
        service('/api', '/customer/resea/tDataProductInfo/myProductList', 'GET', params,
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