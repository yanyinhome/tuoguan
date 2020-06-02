import {request} from '../utils/bd_request';

/* 活动数据api */
export default {

    /* 活动列表 */
    getActivityList:function (activityClassify,success,fail) {
        let params = {
            activityClassify:activityClassify === "全部" ? "" : activityClassify,
            pageNo:1,
            pageSize:100
        };
        request('get','/api','/customer/resea/tActivity/activityList',params,function (result) {
            success(result.records)
        },function (err) {
            if (fail !== null && typeof fail === "function"){
                fail(err);
            }
        });
    },

    /** 加载活动详情数据 */

    getActivityDetail:function(param,success,fail){
        request('get','/api', '/customer/resea/tActivity/activityInfo', param, function (res) {
            if (res) {
                let data = res;
                success(data);
            }
        },function (err) {
            if (fail !== null && typeof fail === "function"){
                fail(err);
            }
        });
    }
}
