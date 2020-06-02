import React, {Component} from 'react'
import {Flex} from 'antd-mobile';
import INavBar from "../../components/i-navbar";
import Select from "../../components/select";
import  "./index.less"
import api_services from '../../services/openDay_api'

//搜索框
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchListDataSource:[],
            searchParam:{
                productNo:"",
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
    getProductParam=(productNo)=>{
        const {searchParam}=this.state;
        const newSearchParam=Object.assign({},searchParam,{productNo})
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
                val="productNo"
                keyType="id"
                handleChange={this.getProductParam}
                />
            </div>
        )

    }
}
class Tab extends Component {
    tabClick=(showFlag)=>{
        this.props.getTabFlag({showFlag})
    }
    goToDetail=(param)=>{
        const option={pathname:"productInfo",query:param}
        this.props.parentProps.push(option)
    }
    render(){
        const {showFlag,BeforeOpenTmpeDataSource,trusteeshipData}=this.props;
        const raiseUserClass=showFlag===1?"active":""
        const trusteeshipClass=showFlag===2?"active":""
        const transactionList=showFlag===1?BeforeOpenTmpeDataSource.list.map((item,index)=>{
            return(
                <div key={index} className="listItem" onClick={()=>{this.goToDetail(item)}}>
                    <div className="listTop">
                        {`${item.productName}`}<span className="rightIcon"></span>
                    </div>
                    <div className="listBottom">
                            {`${item.productNo}`} <span className="productState">{`${item.openType}`}</span> <span className="time">{`${item.openDate.substring(0,10)}`}</span>
                    </div>
                </div>
            )
        }):trusteeshipData.list.map((item,index)=>{
            return(
                <div key={index} className="listItem" onClick={(item)=>{this.goToDetail(item)}}>
                <div className="listTop">
                    {`${item.productName}`}<span className="rightIcon"></span>
                </div>
                <div className="listBottom">
										{`${item.productNo}`} <span className="productState">{`${item.openType}`}</span> <span className="time">{`${item.openDate.substring(0,10)}`}</span>
                </div>
            </div>
            )
        })
        return(
            <div className="tab">
                <Flex>
                    <Flex.Item key="1">
                        <div className={`tabtitle ${raiseUserClass} borderBottom`} onClick={()=>this.tabClick(1)} >
                            历史开放日 
                            <div className="redBlock">
                                <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="2">
                        <div className={`tabtitle ${trusteeshipClass} borderBottom`} onClick={()=>this.tabClick(2)} >
                            未来开放日
                            <div  className="redBlock">
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
export default class openDay extends Component{
    constructor(props){
        super(props)
        this.state={
            showFlag:1,
            BeforeOpenTmpeDataSource:{
                total:0,
                pageNo:1,
                pageSize:10,
                list:[
                    {
                        productName: "米多利-鸿顺安瑞私募投资基金1号",
                        productNo: "SX222",
                        businessType: "申购赎回",
                        openDate: "2018-01-05 00:00:00.0",
                        openType: "固开", 
                    },
                ]   
            },
            trusteeshipData:{
                total:0,
                pageNo:1,
                pageSize:10,
                list:[
                    {
                        productName: "米多利-鸿顺安瑞私募投资基金1号",
                        productNo: "SX1613",
                        businessType: "申购赎回",
                        openDate: "2018-01-05 00:00:00.0",
                        openType: "固开", 
                                },
                        ]   
                    },
        }
    }
    SelectChangeQuery=(param)=>{
        param.productNo="SX1613";
        api_services.findBeforeOpenTmpe(this.initHistoryOpenData,null,param)
        api_services.findAfterOpenTmpe(this.initFutureOpenData,null,param)
    }
    initHistoryOpenData=(data)=>{
        this.setState({BeforeOpenTmpeDataSource:{...data}})
    }
    initFutureOpenData=(data)=>{
        this.setState({trusteeshipData:{...data}})
    }
    getTabFlag=(showFlag)=>{
        this.setState(showFlag)
      }
    render(){
        return (
            <div className='home_container open_day'>
                <INavBar class={`inavbar whtnavbar`} navlabel='开放日' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
                <Search
                    output={this.SelectChangeQuery}
                />
                <Tab
                    BeforeOpenTmpeDataSource={this.state.BeforeOpenTmpeDataSource}
                    trusteeshipData={this.state.trusteeshipData}
                    getTabFlag={this.getTabFlag}
                    showFlag={this.state.showFlag}
                    parentProps={this.props.history}
                />
            </div>
        )
    }
}