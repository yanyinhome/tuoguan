import {request} from '../utils/bd_request';
import bd_utils from "../utils/bd_utils";

export default {

    /* 获取专题列表 */
    getSubjectsList:function (success,fail,params) {

        params = bd_utils.checkPageParams(params);

        request('get','/api','/customer/resea/tSpecialTopic/topicList',params,function (result) {
            success(result)
        },function (err) {
            if (fail !== null && typeof fail === "function"){
                fail(err);
            }
        });
    },

    /* 获取研报、活动专题 */
    getSubjectTypeList:function (type,success,fail,params) {
        var url = "";
        if (type === 1){
            url = "/customer/resea/tReportInfo/reportInfoList";
        }else if (type === 2){
            url = "/customer/resea/tActivity/activityList";
        }

        params = bd_utils.checkPageParams(params);

        request('get','/api',url,params,function (result) {
            success(result.records)
        },function (err) {
            if (fail !== null && typeof fail === "function"){
                fail(err);
            }
        });
    }

}