import Qs from "qs";
import md5 from "js-md5"
import bd_storage from "./bd_storage";
import CONSTANTS from "./constants";

export default {
    dateFormat: function (timeStr) {

        if (this.isEmpty(timeStr)) {
            return '1970-01-01 00:00';
        }

        var str = timeStr.toString().replace(/-/g, "/").replace(".000+0000", "").replace("T", " ");
        var date = new Date(str);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    },
    // 日期格式化
    dayFormat:(date="")=>{
        if(!date){
            date=new Date();
        }      
        let year = date.getFullYear();       //年
        let month = date.getMonth() + 1;     //月
        let day = date.getDate();            //日
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";      
        return(clock); 
    },
    /**
     * 非空判断
     * @param params
     * @returns {boolean}
     */
    isEmpty: function (params) {
        return params === null || params === undefined || params === "undefined" || params.length === 0;
    },

    /**
     * 非空拦截
     * @param param 拦截参数
     * @param defaultValue 空值默认值
     */
    notNull: function (param, defaultValue) {
        return param ? param : (defaultValue ? defaultValue : '');
    },

    /**
     * 检查分页参数
     * @param params
     * @param size
     * @returns {{pageNo: number, pageSize: number}}
     */
    checkPageParams: function (params, size) {

        let pageNo = 1;
        let pageSize = 5;

        if (this.isEmpty(size)) {
            size = pageSize;
        }

        if (this.isEmpty(params)) {
            params = {
                pageNo: pageNo,
                pageSize: size
            };
        } else {
            if (this.isEmpty(params.pageNo)) {
                params.pageNo = pageNo;
                params.pageSize = size;
            }
        }

        return params;
    },

    timeFormat: function (timeStr, isNeedTime = true) {
        if (!timeStr) {
            return timeStr
        }
        if (!timeStr.includes("T")) {
            return timeStr
        }
        let arr = timeStr.split("T")
        if (isNeedTime) {
            return (arr[0] + " " + arr[1].substring(0, 5))
        } else {
            return (arr[0])
        }


    },

    /**
     * 取出jsonarraystring中的指定key值
     * @param obj
     * @param key
     * @param jsonKey
     * @returns {null|*}
     */
    fetchJsonArrayValue: function (obj, key, jsonKey) {
        try {
            let jsonValue = obj[key];
            if (!this.isEmpty(jsonValue)) {
                let jsonObj = JSON.parse(jsonValue);

                if (this.isEmpty(jsonKey)) {
                    return jsonObj[key][0];
                } else {
                    return jsonObj[jsonKey][0];
                }
            }
            return null;
        } catch (e) {
            console.error('json转换异常');
            return null;
        }
    },

    /**
     * 取出标签
     */
    fetchLabels: function (str) {
        let labels = [];
        if (!this.isEmpty(str)) {
            labels = str.split("/");
        }
        return labels;
    },

    /**
     * search方式跳转
     * @param history
     * @param path
     * @param data
     */
    searchJump: function (history, path, data) {
        if (this.isEmpty(history)) {
            console.error("history is undefined")
            return;
        }
        history.push({
            pathname: path,
            search: this.isEmpty(data) ? '' : Qs.stringify(data)
        })
    },

    /**
     * 取出search url中的参数
     * @param location
     * @returns {any}
     */
    fetchSearchParams: function (location) {
        if (this.isEmpty(location)) {
            console.error("location is undefined")
            return;
        }

        let searchStr = location.search;
        return this.isEmpty(searchStr) ? {} : Qs.parse(searchStr.split('?')[1]);
    },

    /**
     * 登陆密码加密
     * @param pwd
     * @returns {*}
     */
    encryptionPwd: function (pwd) {
        return md5(pwd + '_csc', 32)
    },

    /**
     * 获取用户信息
     * @param history 没有history不跳转
     * @returns {string|*}
     */
    getUser: function (history) {
        let user = bd_storage.get(CONSTANTS.KEYS.user);
        if (this.isEmpty(user) && !this.isEmpty(history)) {
            //没有用户信息,去登陆界面
            this.searchJump(history, '/login');
            throw '403 - 请先登陆';
        }
        return user;
    },

    /**
     * 判断两个对象是否相同
     * @param o1
     * @param o2
     * @returns {boolean}
     */
    isObjEqual: function (o1, o2) {
        let props1 = Object.getOwnPropertyNames(o1);
        let props2 = Object.getOwnPropertyNames(o2);
        if (props1.length !== props2.length) {
            return false;
        }
        for (let i = 0, max = props1.length; i < max; i++) {
            let propName = props1[i];
            if (o1[propName] !== o2[propName]) {
                return false;
            }
        }
        return true;
    },
    /**
     * 界面更新逻辑封装与日志打印
     * @param Clazz            界面类名
     * @param nextProps        nextProps
     * @param nextState        nextState
     * @param currentState     this.state
     * @returns {boolean}
     */
    shouldComponentUpdate: function (Clazz, nextProps, nextState, currentState) {
        let enableUpdate = (currentState !== nextState);
        if (CONSTANTS.LOG.componentUpdate.state) {
            console.log(Clazz, "nextState", nextState);
            console.log(Clazz, "this.state", currentState);
        }
        if (CONSTANTS.LOG.componentUpdate.result) {
            console.log(Clazz, "enableUpdate", enableUpdate);
        }
        return enableUpdate;
    }
}

