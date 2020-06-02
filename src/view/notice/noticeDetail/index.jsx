import React, {Component} from 'react'
import INavBar from "../../../components/i-navbar";

import  "../index.less"

export default class NoticeDetail extends Component{
    render(){
        const {content,title,createDate}=this.props.location.query;
        return (
            <div className='home_container noticeDetail'>
            <INavBar class={`inavbar whtnavbar`} navlabel="新通知" leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
            <div className="content">
                <h2>{title||"标题"}</h2>
                <span>{createDate}</span>
                <div dangerouslySetInnerHTML = {{ __html: content}} />
            </div>
            </div>
        )
    }
}