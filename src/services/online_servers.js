import service from '../utils/bd_request';

/* 活动数据api */
export default {

    /* 速评详情 */
    // getReviewDetail:function (activityClassify,success,fail) {

    //     service('/api','/customer/resea/dataEvaluationInfo/evaluationInfo','get',activityClassify,function (data) {
    //         success(data)
    //     },function (err) {
    //         if (fail !== null && typeof fail === "function"){
    //             fail(err);
    //         }
    //     });
    // },
    // //  速评列表
    // getRiviewList:function (activityClassify,success,fail) {
  
    //     service('/api','/customer/resea/dataEvaluationInfo/evaluationInfoList','get',activityClassify,function (data) {
    //         success(data)
    //     },function (err) {
    //         if (fail !== null && typeof fail === "function"){
    //             fail(err);
    //         }
    //     });
    // },
    // addCollect:function(activityClassify,success,fail){
    //     service('/api','/customer/resea/tCollect/addCollect','get',activityClassify,function (data) {
    //         success(data)
    //     },function (err) {
    //         if (fail !== null && typeof fail === "function"){
    //             fail(err);
    //         }
    //     });
    // },
    // addLike:function(activityClassify,success,fail){
    //     service('/api','/customer/resea/tLike/addLike','get',activityClassify,function (data) {
    //         success(data)
    //     },function (err) {
    //         if (fail !== null && typeof fail === "function"){
    //             fail(err);
    //         }
    //     });
    // },
    onlineSers:function(activityClassify,success,fail){
        console.log(activityClassify)
        service('/api','/institution/tgpt/product/getUserById','post',activityClassify,function (data) {
            success(data)
        },function (err) {
            if (fail !== null && typeof fail === "function"){
                fail(err);
            }
        });
    },
}
