import React, {Component} from 'react'
import INavBar from "../../../components/i-navbar";
import api_services from '../../../services/hosting_api'
import  "./index.less"


const HistoryTable=({data})=>{
    const trlist=data.map((item,index)=>(
        <tr key={`${item.data}+${index}`}>
            <td className={index===0?"padd26":""}>{item.label?item.label:""}<span>（{item.transactioncfmdate}）</span></td>
            <td className={index===0?"padd26":""}>{item.confirmedvol}</td>
            <td className={index===0?"padd26":""}>{item.confirmedamount}</td>
        </tr>
    ))
    return (
        <table>
            <thead>
                <tr>
                <td >交易类型/确认日期</td>
                <td >确认份额</td>
                <td >确认金额</td>
                </tr>
            </thead>
            <tbody>
                {trlist}
            </tbody>
        </table>
    )
}

class HonstingList extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        const {HonstingDataSource}=this.props;
        const HosttingList=HonstingDataSource.map((item,inde)=>(
            <div key={inde} className="itemBox">
                <div className={`detailHead ${(inde+1)%2?"":"enev"}`}>
                    <div className="detailHeadLeft">
                        {item.customerShareInfo.investorname}
                    </div>
                    <div className="detailHeadRight">
                    <p>证件号码：{item.customerShareInfo.certificateno}</p>
                    <p>基金号码：{item.customerShareInfo.taaccountid}</p>
                    </div>
                </div>
                <div className="itemBottom">
                <p><span className="lable">产品名称</span><span>{item.customerShareInfo.name}</span></p>
                <p><span className="lable">产品代码</span><span>{item.customerShareInfo.productNo}</span></p>
                </div>
                <div className="itemCenter">
                    <div className="centerLeft">
                        <h3><span>{item.customerShareInfo.afterFundvol}</span></h3>
                        <p>份额余额</p>
                    </div>
                    <div className="centerRight">
                        <h3>{item.customerShareInfo.availableFundvol}</h3>
                        <p>可用份额</p>
                    </div>
                </div>
                <HistoryTable data={item.customerTransInfoList}/>
            </div>
            ))
        return(
            <div className="hostingDetailContent">
               {HosttingList}
            </div>
        )
    }
}

export default class Hosting extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource:[
                {
                customerShareInfo:{
                    investorname:"于小彤",
                    taaccountid:11000219706010878,
                    certificateno:13683489570,
                    afterFundvol:178299.18,
                    availableFundvol:152678.18,
                    name:"福建滚雪球卓越一号私募基金",
                    productNo:"SCW038",
                },   
                customerTransInfoList:[
                    {
                        transactioncfmdate:20200221,  
                        confirmedvol:939849.62,  
                        confirmedamount:100000.00,
                        label:"申购确认"  
                    },
                    {
                        transactioncfmdate:20200221,  
                        confirmedvol:939849.62,  
                        confirmedamount:100000.00,
                        label:"申购确认"   
                    },
                    {
                        transactioncfmdate:20200221,  
                        confirmedvol:939849.62,  
                        confirmedamount:100000.00,
                        label:"申购确认"   
                    },
                ]
                },
            ]
        }
    }
    initDetail=(dataSource)=>{
        this.setState({dataSource})
    }
    componentDidMount(){
        const {productNo,taaccountid}=this.props.location.query;
        // api_services.shareInfo(this.initDetail,this.show,{productNo:"ST3343",taaccountid:"CS1100198708"})
        api_services.shareInfo(this.initDetail,null,{productNo,taaccountid})
    }
    render(){
        return(
            <div className='home_container boxTop'>
                <INavBar class={`inavbar whtnavbar`} navlabel='份额详情' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
                {/* <div className="margin160"></div> */}
                <HonstingList
                HonstingDataSource={this.state.dataSource}
                />
            </div>
        )
    }
}