import axios from 'axios';
import {Toast} from 'antd-mobile';
import $ from 'jquery';
import md5 from 'js-md5';
import bd_utils from "./bd_utils";
import Tip from "../components/tip";
import CONSTANTS from "./constants";

// const baseHost = "https://zs-test.csc108.com/rest";
const baseHost = null;
const hostMapper = {
    // "/api": "https://zs-test.csc108.com/rest",
    "/api": 'https://zs-test.csc108.com/rest',
    "/local": process.env.PUBLIC_URL
};

/* 引入此包统一命名service */
export default function service(proxyName, url, method, data, success, fail) {

    /* 数据签名 */
    data = handleAuthor(url, data, method);

    proxyName = hostMapper[proxyName];

    axios(proxyName + url, {method: method, params: data}).then(data => {
        success(data)
    }).catch(err => {
        Toast.hide();
        fail(err)
    });
}

/* 加载本地资源 */
export function filePublicService(proxyName, url, success, fail) {

    proxyName = hostMapper[proxyName];
    $.ajax({
        url: proxyName + url,
        dataType: "json",
        success: function (data) {
            console.log(data)
        }
    });
}

export function postBody(proxyName, url, body, success, fail) {

    /* 数据签名 */
    let sign = handleAuthor(url, null, 'POST');

    if (!bd_utils.isEmpty(baseHost)) {
        proxyName = baseHost;
    }

    axios(proxyName + url,
        {
            method: 'POST',
            // params: body,
            params: sign,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json;"
            },
        }).then(data => {
        success(data)
    }).catch(err => {
        Toast.hide();
        fail(err)
    })
}

/**
 * 通用请求
 * @param method     请求方法
 * @param proxyName  代理名称
 * @param url        请求地址
 * @param params     请求参数
 * @param success    成功执行函数
 * @param fail       失败执行函数
 * @param option     请求选项(postbody等需要添加请求头,有特殊定制的时候添加)
 * @param filter     是否进行统一过滤(默认为ture,会对response进行response.code判断,然后返回response.data)
 */
export function request(method, proxyName, url, params, success, fail, option, filter) {

    if (success === null || typeof success !== "function") {
        console.error('请传入成功回调函数success()');
        return;
    }

    if (bd_utils.isEmpty(filter)) {
        filter = true;
    }

    /* 超时时间 */
    axios.defaults.timeout = CONSTANTS.HTTP.timeout;
    /* 数据签名 */
    let sign = handleAuthor(url, params, method);
    proxyName = hostMapper[proxyName];

    let requestData = {
        method: method,
        params: sign
    }

    if (!bd_utils.isEmpty(option)) {
        requestData = $.extend(requestData, option);
    }

    axios(proxyName + url, requestData).then(response => {
        //http请求响应
        let errTips = '';
        if (!bd_utils.isEmpty(response)) {

            if (!filter) {
                //不进行过滤,直接返回整个response
                success(response);
                return;
            }

            if (!bd_utils.isEmpty(response.code)) {
                if (CONSTANTS.HTTP.successCodes.includes(parseInt(response.code))) {
                    //成功的请求
                    success(response.data);
                    return;
                } else {
                    errTips = response.message;
                    console.error(CONSTANTS.HTTP.errCodeTips, response);
                }
            } else {
                errTips = response.errmsg;
                console.error(CONSTANTS.HTTP.errCodeTips, response);
            }
        } else {
            console.error(CONSTANTS.HTTP.responseErrTips, 'response为空');
        }
        //执行错误提示
        if (CONSTANTS.HTTP.errTip) {
            Tip.info(bd_utils.notNull(errTips, CONSTANTS.HTTP.responseErrTips));
        }
        //执行失败回调
        if (fail !== null && typeof fail === "function") {
            fail(response);
        }
    }).catch(err => {
        //http请求错误
        //执行错误提示
        if (CONSTANTS.HTTP.errTip) {
            Tip.info(CONSTANTS.HTTP.httpErrTips);
        }
        //执行失败回调
        if (fail !== null && typeof fail === "function") {
            fail(err);
        }
    })
}


/* 请求前拦截 */
axios.interceptors.request.use(config => {
    Toast.loading('加载中', 200000);
    console.log(config.url);
    return config;
}, err => {
    return Promise.reject(err)
});

/* 相应拦截 */
axios.interceptors.response.use(config => {
    Toast.hide();
    return config.data;
}, err => {
    Toast.hide();
    return Promise.reject(err)
});

/* 数据签名 */
function handleAuthor(url, data, method) {

    url = '/rest' + url;
    // TODO: 测试key，需要确认生产和测试的，然后在kmc-hostUrls文件里替换
    var apikey = 'icsapp';
    var apisecret = 'NPbv0msgxDBUMlax';
    // TODO: 判断生产还是测试，使用相应的key
    var authorData = {
        apikey: apikey,
        ts: curTimeAdd10Min(),
    };
    var allData = $.extend(data, authorData);
    var paramStrings = [];
    for (let i in allData) {
        if (allData[i] !== undefined || allData[i] !== null || allData[i] !== '') {
            paramStrings.push(i.toString() + '=' + allData[i].toString());
        }
    }

    var signStr = createSign(method.toUpperCase(), url, apisecret, paramStrings, null);
    allData['sign'] = signStr;
    return allData;
}

/**
 * 生成签名
 */
function createSign(method, servicePath, apiSecret, paramStrings, postbody) {
    var str = method + servicePath;
    paramStrings = paramStrings.sort();
    str = str + paramStrings.join("");
    str = str + apiSecret;
    str.toString();
    var urlEncodeStr = encodeURIComponent(str);
    return md5(urlEncodeStr);
}

/**
 * 当前时间戳加10分钟
 */
function curTimeAdd10Min() {
    var time = new Date();
    var t = time.getTime();
    time.setTime(t + 1000 * 60 * 10);
    return time.getTime();
}



