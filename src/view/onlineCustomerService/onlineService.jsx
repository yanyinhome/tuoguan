import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import './onlineService.less'
import { Modal, Button, WhiteSpace, WingBlank } from 'antd-mobile';

class OnlineServices extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='service-container'>
                 <INavBar class={`inavbar whtnavbar`} navlabel='在线客服' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />

                 
                 <WingBlank size="lg">
                 <object data={`https://tgkf.csc108.com:8443/chatVisitor/mobile.html?codeKey=1&companyPk=8a6dfa386dcab402016dcd3bbde40000&channelPk=8a6dfa3b71f42ead0172099970e00000&userId=0865f7b59bb048bc89e3bb5e26815af7`} type="text/html" className='services_box' ></object>
                </WingBlank>
                
            </div>
         );
    }
}
 
export default OnlineServices;