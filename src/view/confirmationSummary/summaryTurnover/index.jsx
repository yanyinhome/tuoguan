import React, {Component} from 'react';
import {Flex} from 'antd-mobile';
import INavBar from "../../../components/i-navbar";
import './index.less'
import api_services from '../../../services/confirmationSummary_api'

const Title=({productName="传入的标题",time="2019-12-05",type="a"})=>{
    const typeMap={a:"赎回"}
    return (
        <div className="title">
            {productName}
            <div className="info">
            <span className="time">{time}</span>
            <span className="icon">{typeMap[type]}</span>
            </div>
        </div>
    )
}
class Tab extends Component {
    tabClick=(showFlag)=>{
        this.props.getTabFlag({showFlag})
    }
    render(){
        const {showFlag,raiseUserData,trusteeshipData}=this.props;
        const raiseUserClass=showFlag===1?"active":""
        const trusteeshipClass=showFlag===2?"active":""
        const transactionList=showFlag===1?raiseUserData.recordList.map((item,index)=>{
            const clasname=item.transAmount>0?"red":""
            return(
                <div key={index} className="listItem">
                    <div className="listLeft">
                        <div>
                            {`${item.bankName} ${item.account}`}
                        </div>
                        <div>
                            {`${item.tradeTime}`}
                        </div>
                    </div>
                    <div className={`${clasname} listRight`}>
                        {item.transAmount>0?`+${item.transAmount.toLocaleString()}.00`:`${item.transAmount.toLocaleString()}.00`}
                    </div>
                </div>
            )
        }):trusteeshipData.recordList.map((item,index)=>{
            const clasname=item.transAmount>0?"red":"";
            return(
                <div key={index} className="listItem">
                    <div className="listLeft">
                        <div>
                            {`${item.bankName} ${item.account}`}
                        </div>
                        <div>
                            {`${item.tradeTime}`}
                        </div>
                    </div>
                    <div className={`${clasname} listRight`}>
                        {item.transAmount>0?`+${item.transAmount.toLocaleString()}.00`:`${item.transAmount.toLocaleString()}.00`}
                    </div>
                </div>
            )
        })
        return(
            <div className="tab">
                <Flex>
                    <Flex.Item key="1">
                        <div className={`tabtitle ${raiseUserClass} borderBottom`} onClick={()=>this.tabClick(1)} >
                            募集户 
                            <div className="redBlock">
                                <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="2">
                        <div className={`tabtitle ${trusteeshipClass} borderBottom`} onClick={()=>this.tabClick(2)} >
                            托管户
                            <div  className="redBlock">
                              <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                </Flex>
                <div className="content">
                        {this.props.showFlag===1?
                        (
                            <div className="head">
                                <div className="info">
                                    {`募集户： ${raiseUserData.bankAccount}`}
                                </div>
                                <div className="balance">
                                    {`余额： ${raiseUserData.balance.toLocaleString()}`} <span className="down">&nbsp;</span>
                                </div>
                            </div>     
                        ) :(
                            <div className="head">
                                <div className="info">
                                    {`托管户： ${trusteeshipData.bankAccount}`}
                                </div>
                                <div className="balance">
                                    {`余额： ${trusteeshipData.balance.toLocaleString()}`} <span className="down">&nbsp;</span>
                                </div>
                            </div> 
                        )   
                    }
                    <div className="transactionbox">
                        {transactionList}
                    </div>
                </div>
            </div>
        )
    }
}
export default class summaryTurnover extends Component{
    constructor(props){
        super(props)
        this.state={
            raiseUserData:{
                bankAccount:0,
                balance:0,
                recordList:[
                    {
                      bankName:"兴业银行大兴路一号",
                      account:"1224567890",
                      tradeTime:"09:21",
                      transAmount:10000,
                     },
                    {
                      bankName:"兴业银行大兴路一号",
                      account:"1224567890",
                      tradeTime:"09:21",
                      transAmount:10000,
                     },
                ]
                },
              trusteeshipData:{
                    bankAccount:0,
                    balance:0,
                  recordList:[
                    {
                      bankName:"兴业银行大兴路一号",
                      account:"1224567890",
                      tradeTime:"09:21",
                      transAmount:-10000,
                    },
                    {
                      bankName:"兴业银行大兴路一号",
                      account:"1224567890",
                      tradeTime:"09:21",
                      transAmount:-10000,
                    },
                  ]
              },
              showFlag:1,
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    getTabFlag=(showFlag)=>{
        this.setState(showFlag)
      }
    render(){
        return (
            <div className="home_container turnover summaryTurnover">
                <INavBar class={`inavbar whtnavbar`} navlabel='确认汇总流水' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}}]} />
                <Title/>
                <Tab
                    raiseUserData={this.state.raiseUserData}
                    trusteeshipData={this.state.trusteeshipData}
                    getTabFlag={this.getTabFlag}
                    showFlag={this.state.showFlag}
                />
            </div>
        )
    }
}