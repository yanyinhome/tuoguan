import React, {Component} from 'react'
import {Flex} from 'antd-mobile';
import INavBar from "../../components/i-navbar";
import Select from "../../components/select";
import  "./index.less"
import api_services from '../../services/turnover_api'


//搜索框
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchListDataSource:[],
            timeType:[
                {
                name:"近一周",
                val:"0",
                id:"0",
                },
                {
                name:"近两周",
                val:"1",
                id:"1",
                },
                {
                name:"近三周",
                val:"2",
                id:"2",
                },
                {
                name:"近一月",
                val:"3",
                id:"3",
                },
            ],
            searchParam:{
                id:"",
                dataType:"",
             }
        }
    }
    componentDidMount(){
      api_services.getProductList(this.initSearchList,this.show,{})  
    }
    show=(data)=>{
    }
    initSearchList=(data)=>{
        const{list}=data;
        this.setState({searchListDataSource:list})
    }
    getProductParam=(id)=>{
        const {searchParam}=this.state;
        const newSearchParam=Object.assign({},searchParam,{id})
        this.setState({searchParam:newSearchParam},()=>{this.props.output(newSearchParam)})
    }
    getdataTypeParam=(dataType)=>{
        const {searchParam}=this.state;
        const newSearchParam=Object.assign({},searchParam,{dataType})
        this.setState({searchParam:newSearchParam},()=>{this.props.output(newSearchParam)})
    }

    render () {
        return (
            <div id="search" className={`search-box`}>
                <Select
                key="1"
                title="产品名称"
                data={this.state.searchListDataSource}
                text="productName"
                val="id"
                keyType="productNo"
                handleChange={this.getProductParam}
                />
                <Select
                key="2"
                title="选择时间"
                data={this.state.timeType}
                text="name"
                val="val"
                keyType="id"
                handleChange={this.getdataTypeParam}
                />
            </div>
        )

    }
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
export default class Trunover extends Component{
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
          cpId:"6BA83843F9346DC3E053281C110A4F12",
        }
    }
    componentDidMount(){
      const {cpId}=this.state;
      api_services.raiseRunQuery(this.updateraiseRunQuery,null,{cpId})
      api_services.hostRunQuery(this.updatehostRunQuery,null,{cpId})
    }
    updateraiseRunQuery=(data)=>{
        const {balance=0,bankAccount=0,page:{list}}=data;
        const newRaiseUserData={bankAccount,balance,recordList:list}
        this.setState({raiseUserData:newRaiseUserData})
    }
    updatehostRunQuery=(data)=>{
      const {balance=0,bankAccount=0,page:{list}}=data;
      const newtrusteeshipData={bankAccount,balance,recordList:list}
      this.setState({trusteeshipData:newtrusteeshipData})
    }
    SelectChangeQuery=(param)=>{
        param.cpId=param.id?"":this.state.cpId;
        api_services.raiseRunQuery(this.updateraiseRunQuery,null,param)
        api_services.hostRunQuery(this.updatehostRunQuery,null,param)
    }
    getTabFlag=(showFlag)=>{
      this.setState(showFlag)
    }
    render(){
        return(
            <div className='home_container turnover'>
                <INavBar class={`inavbar whtnavbar`} navlabel='流水查询' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
                {/* <div className="margin160"></div> */}
                <Search
                output={this.SelectChangeQuery}
                />
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