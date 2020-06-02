import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import api_services from '../../services/home_api'
import {Flex,Accordion,List} from 'antd-mobile';

import  "./index.less"

const NoticeItem=({item,gotoDetail})=>{
    return (
        <div className="noticeItem" >
            <div className="noticeDate">{item.createDate}</div>
            <div className="contentBox">
                <h3>{item.title||"无标题"}</h3>
                <p>{item.summary}</p>
                <span className="more" onClick={()=>{gotoDetail(item)}}>了解详细</span>
            </div>
        </div>
    )
}
// tab
class Tab extends Component {
    tabClick=(showFlag)=>{
        this.props.getTabFlag({showFlag})
    }
    gotoDetail=(item)=>{
        const option={pathname:"noticeDetail",query:item}
        this.props.parentProps.push(option)
    }
    render(){
        const {showFlag,notice}=this.props;
        const NoticeClass=showFlag===1?"active":"";
        const BusinessClass=showFlag===2?"active":"";
        const ClassRoomClass=showFlag===3?"active":"";
        const notices=notice.map(item=><NoticeItem item={item} gotoDetail={this.gotoDetail} key={item.id} />);
        const transactionList=showFlag===1?
           (
            <div>
                {notices}
            </div>
            )
        :showFlag===2?(
            <div>
                3
            </div> 
            ):
            (
                <div className="mail_box">
                  4
                </div> 
            )
        return(
            <div className="tab">
                <Flex>
                    <Flex.Item key="1">
                        <div className={`tabtitle ${NoticeClass} borderBottom`} onClick={()=>this.tabClick(1)} >
                            新通知 
                            <div className="redBlock">
                                <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="2">
                        <div className={`tabtitle ${BusinessClass} borderBottom`} onClick={()=>this.tabClick(2)} >
                            新业务
                            <div  className="redBlock">
                              <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="3">
                        <div className={`tabtitle ${ClassRoomClass} borderBottom`} onClick={()=>this.tabClick(3)} >
                            微课堂 
                            <div className="redBlock">
                                <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                </Flex>
                <div className="content">
                    <div className="transactionbox">
                        {transactionList}
                    </div>
                </div>
            </div>
        )
    }
}
export default class Notice extends Component{
    constructor(props){
        super(props)
        this.state={
            showFlag:1,
            notice:[],
            titleMap:{
                "1":"新通知",
                "2":"新业务",
                "3":"新课堂",
            }
        }
    }
    componentDidMount(){
        const showFlag=this.props.location.query.flag+1||1;
        if(showFlag){
            this.setState({showFlag})
        }
        api_services.findNotice(this.initNotice,this.fail,{cpId:"allCompany"})
    }
    show=(data)=>{
        console.log(data)
    }
    fail=(data)=>{
        console.log(data)
    }
    SelectChangeQuery=(param)=>{  
    }
    initNotice=(data)=>{
        this.setState({notice:data.list})

    }
    getTabFlag=(showFlag)=>{
        this.setState(showFlag)
    }
    render(){
        const {titleMap,showFlag}=this.state;
        return (
            <div className='home_container notice'>
            <INavBar class={`inavbar whtnavbar`} navlabel={titleMap[showFlag]} leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
            <Tab
                getTabFlag={this.getTabFlag}
                showFlag={this.state.showFlag}
                notice={this.state.notice}
                parentProps={this.props.history}
            />
            </div>
        )
    }
}