import service, {postBody, request} from '../utils/bd_request';
import bd_utils from "../utils/bd_utils";

/* 服务研究通用数据接口 导出引用时，统一使用CommonService命名*/
export default {
    /**
     * 登陆请求
     * @param success 成功
     * @param fail    失败
     * @param params  参数
     */
    login: function (success, fail, params) {

        request('post', '/api', '/customer/insti/user/login/account', null, function (response) {
                success(response.data);
            }, null,
            {
                data: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json;"
                }
            })
    },
    /* 最新研报列表请求 */
    researchReportList: function (success, fail, params) {

        params = bd_utils.checkPageParams(params);

        request('get', '/api', '/customer/resea/tReportInfo/reportInfoList', params, function (result) {
            if (result && result.records) {
                success(result.records);
            }
        }, function (err) {
            if (fail !== null && typeof fail === "function") {
                fail(err);
            }
        });
    },

    reportToken: function (success, fail) {
        request('post','/api','/customer/resea/tReportInfo/reportToken',null,success,fail);
    },

    /* 热门活动列表请求 */
    hotActivityList: function (success, fail, params) {

        params = bd_utils.checkPageParams(params);

        request('get','/api', '/customer/resea/tActivity/activityList', params, function (result) {
            if (result && result.records) {
                success(result.records);
            }
        }, function (err) {
            if (fail !== null && typeof fail === "function") {
                fail(err);
            }
        });
    },

    /* 速评 */
    quickReviewList: function (success, fail, params) {

        params = bd_utils.checkPageParams(params);

        request('get','/api','/customer/resea/dataEvaluationInfo/evaluationInfoList', params, function (result) {
            if (result && result.records) {
                let data = result.records.map(t => {
                    if (t.author) {
                        t.author = t.author[0]
                    }
                    return t
                })
                success(data);
            }
        }, function (err) {
            if (fail !== null && typeof fail === "function") {
                fail(err);
            }
        });
    },

    /*分析师*/
    researchTermsList: function (success, fail, params) {

        params = bd_utils.checkPageParams(params);

        request('get','/api', '/customer/resea/tSysUser/sysAuthorList', params, function (result) {
            if (result && result.records) {
                success(result.records);
            }
        }, function (err) {
            if (fail !== null && typeof fail === "function") {
                fail(err);
            }
        })
    },

    /**
     * 加载特色产品类列表
     * @param success
     * @param fail
     * @param params
     */
    productList: function (success, fail, params) {

        params = bd_utils.checkPageParams(params, 3);

        request('get','/api', '/customer/resea/tDataProductInfo/productList', params, function (result) {
            if (result.data && result.data.records) {
                success(result.data.records);
            }
        }, function (err) {
            if (fail !== null && typeof fail === "function") {
                fail(err);
            }
        })
    },

    /**
     * 查询分析师个人主页
     * @param success
     * @param fail
     * @param params
     */
    analystsInfo: function (params, success, fail) {
        service('/api', '/customer/resea/tSysUser/sysAuthorInfo', 'get', params,
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

    /**
     * 通用公共接口
     * 人气操作
     * */

    /* 关注 */
    addAttention: function (params, success, fail) {
        postBody('/api', '/customer/resea/tAttention/addAttention', params,
            function (res) {
                if (res.code === 200) {
                    success("关注成功");
                } else {
                    fail("关注失败")
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    },

    /* 取消关注 */
    delAttention: function (params, success, fail) {
        postBody('/api', '/customer/resea/tAttention/delAttention', params,
            function (res) {
                if (res.code === 200) {
                    success("取消关注成功");
                } else {
                    fail("取消关注失败")
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    },
    /* 新增感兴趣 */
    addInterest: function (params, success, fail) {
        postBody('/api', '/customer/resea/tInterest/addInterest', params,
            function (res) {
                if (res.code === 200) {
                    success("收藏成功");
                } else {
                    fail("收藏失败")
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    },

    /* 取消感兴趣 */
    delInterest: function (params, success, fail) {
        postBody('/api', '/customer/resea/tInterest/delInterest', params,
            function (res) {
                if (res.code === 200) {
                    success("取消收藏成功");
                } else {
                    fail("取消收藏失败")
                }
            },
            function (err) {
                if (fail !== null && typeof fail === "function") {
                    fail(err);
                }
            })
    },

    /* 添加点赞 */
    addLike: function(success, fail, params) {
        request('post','/api','/customer/resea/tLike/addLike',null, success, fail, {
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
            }})
    },
    /* 取消点赞 */
    delLike: function(success, fail, params) {
        request('post', '/api', '/customer/resea/tLike/delLike',null, success, fail, {
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
            }})
    },
    /* 添加收藏 */
    addCollect: function(success, fail, params) {
        request('post', '/api', '/customer/resea/tCollect/addCollect',null, success, fail, {
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
            }})
    },
    /* 取消收藏 */
    delCollect: function(success, fail, params) {
        request('post', '/api', '/customer/resea/tCollect/delCollect',null, success, fail, {
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
            }})
    },
    /* 下拉框 */
    getProductList: function(success, fail, params) {
        request('post', '/api', '/institution/tgpt/product/getProduct',null, success, fail, {
            data: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json;"
            }})
    },
}
