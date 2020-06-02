import {Toast} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../css/tip.less'

const config = {
    duration: 2,
    mask: false
};
Toast.config(config)




const Tip = {
    info: function info(content="提示内容") {
        Toast.info(content)
        // const div = document.createElement('div');
        // document.body.appendChild(div);
        // ReactDOM.render(<Toast />, div);
        // // const message = msg ? msg:'这是一条普通提示'
        // //     alert(message)
    },
    success: function success(content = "success") {
        Toast.success(content)
    },
    fail: function fail(content ="失败") {
        Toast.fail(content)
    },
    loading: function () {
        Toast.loading("加载中...")
    },
    close() {
        Toast.hide()
    }
};

export default Tip;


