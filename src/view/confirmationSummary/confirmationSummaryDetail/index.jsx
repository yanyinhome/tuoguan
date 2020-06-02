import React, {Component} from 'react';
import INavBar from "../../../components/i-navbar";
import './index.less'
import api_services from '../../../services/confirmationSummary_api'

const Title=({productName="传入的标题",time="2019-12-05",type="a"})=>{
    return (
        <div className="title">
            {productName}
            <div className="info">
            <span className="time">{time}</span>
            <span className="icon">{type}</span>
            </div>
        </div>
    )
}
const DetailItem=({datasource=[]})=>{
    return datasource.map((item,ind)=>{
        return (
            <div className="itemBox" key={ind}>
                <div className="summaryDetailhead">
                    {item.investorname} <span className="summaryDetailId">{item.certificateno}</span>
                </div>
                <div className="center">
                <div className="center_child">
                    <div className="top">
                    <span className="red">{item.confirmedvol}</span>
                    </div>
                    <div className="bottom">
                    赎回确认份额
                    </div>
                    </div>
                <div className="center_child">
                    <div className="line_box">
                        <div className="top">
                        {item.afterFundvol}
                        </div>
                        <div className="bottom">
                        份额余额
                        </div>
                    </div>
                </div>
                <div className="center_child">
                    <div className="top">
                    {item.availableFundvol}
                    </div>
                    <div className="bottom">
                    可用份额  
                    </div>
                </div>
                </div>
                <div className="bottom">
                    {item.taaccountid}
                </div>
            </div>
        )
    })
}
export default class summaryTurnover extends Component{
    constructor(props){
        super(props)
        this.state={
            datasource:[
                {
                 investorname:"于小彤", 
                 certificateno:"13683489570",
                 taaccountid:"CS1100198708",
                 confirmedvol:"16782.18", 
                 afterFundvol:"178299.18", 
                 availableFundvol:"152678.18", 
                //  sqno:"110002197906010878", 
                }
            ],
            pages:1,
            pageNo:1,
        }
    }
    componentDidMount=()=>{
        console.log(this.props)
        const {businesscodeAck,transactioncfmdate,productNo}=this.props.history.location.query
        const time=transactioncfmdate.substring(0,10)||""
        // api_services.customerShareDailyInfo(this.show(),null,{businesscodeAck,productNo,startTime:time,endTime:time})
        api_services.customerShareDailyInfo(this.show,null,{businesscodeAck:"124",productNo:"ST3343",startTime:"2019-04-25",endTime:"2019-04-25"})
    }
    show=(data)=>{
        const {list,pageNo,pages}=data
        this.setState({pageNo,pages,datasource:list})
    }
    render(){
        const {transactioncfmdate,label}=this.props.history.location.query
        const {name}=this.state.datasource[0]
        return (
            <div className="home_container summaryTurnover confirmationSummaryDetail">
                <INavBar class={`inavbar whtnavbar`} navlabel='确认汇总详情' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}}]} />
                <Title
                time={transactioncfmdate.substring(0,10)}
                type={label}
                productName={name}
                />
                <DetailItem
                 datasource={this.state.datasource}
                />
            </div>
        )
    }
}