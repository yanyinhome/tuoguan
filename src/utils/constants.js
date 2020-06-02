export default {
    KEYS: {
        user: 'auth',
        systemCode: '0003'
    },
    LOG: {
        componentUpdate: {
            state: true,
            result: true
        }
    },
    HTTP: {
        successCodes:[200,203,1],
        errCodeTips:'Code不存在或不匹配成功Code',
        timeout: 8000,
        errTip: true,
        responseErrTips: '网络请求异常',
        httpErrTips: '服务器异常',
    }
}
