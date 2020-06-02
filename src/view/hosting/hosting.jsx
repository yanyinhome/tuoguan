import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import Select from "../../components/select";
import  "./index.less"
import api_services from '../../services/hosting_api'


//搜索框
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productNameList:[
            ],
            investornameList:[
                {
                name:"名称1",
                val:"a",
                id:"1"
                },
                {
                name:"名称2",
                val:"b",
                id:"2"
                },
                {
                name:"名称3",
                val:"c",
                id:"3"
                },
            ],
            searchParam:{
                productNo:"",
                taaccountid:"",
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
    getinvestorname=(id)=>{
        // const {searchParam}=this.state;
        // const newSearchParam=Object.assign({},searchParam,{id})
        // this.setState({searchParam:newSearchParam},()=>{this.props.output(newSearchParam)})
        return;
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
                <Select
                title="客户名称"
                data={this.state.investornameList}
                text="name"
                val="val"
                keyType="id"
                handleChange={this.getinvestorname}
                />
            </div>
        )

    }
}
class HonstingList extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    goDetail=(param)=>{
        const option={pathname:"customerShareDetail",query:param}
        this.props.parentProps.push(option)
    }
    render(){
        const {HonstingDataSource}=this.props;
        const HosttingList=HonstingDataSource.map((item,inde)=>(
            <div key={inde} className="itemBox" onClick={()=>{this.goDetail(item)}}>
                <div className="itemHead">
                    {item.investorname}
                    <span>{item.taaccountid}</span>
                </div>
                <div className="itemCenter">
                    <div className="centerLeft">
                        <h3><span>{item.afterFundvol}</span></h3>
                        <p>份额余额</p>
                    </div>
                    <div className="centerRight">
                        <h3>{item.availableFundvol}</h3>
                        <p>可用份额</p>
                    </div>
                </div>
                <div className="itemBottom">
                <p><span className="lable">产品名称</span><span>{item.name}</span></p>
                <p><span className="lable">产品代码</span><span>{item.productNo}</span></p>
                </div>
            </div>
            ))
        return(
            <div className="hostingContent">
               {HosttingList}
            </div>
        )
    }
}

export default class Hosting extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource:[],
            cpId:"61F1922AD6B363D9E053281C110A9206",
            count:0,
            pageNo:1,
            pageSize:3,
            pages:0,
            param:{}
        }
    }
    renderList=(data)=>{
        const {list,count,pageNo,pages}=data;
        this.setState({dataSource:list,count,pageNo,pages})
    }
    SelectChangeQuery=(param)=>{
        const {pageNo,pageSize}=this.state;
        api_services.shareLastList(this.renderList,null,{...param,productNo:"ST3343",pageNo,pageSize})
        // api_services.hostRunQuery(this.updatehostRunQuery,null,param)
    }
    getMore=()=>{
        const {pageNo,pageSize,param}=this.state;
        api_services.shareLastList(this.renderGetMore,null,{...param,productNo:"ST3343",pageNo:(pageNo+1),pageSize})
    }
    renderGetMore=(data)=>{
        const {list,count,pageNo,pages}=data;
        const {dataSource}=this.state;
        const newDataSource=dataSource.concat(list);
        this.setState({dataSource:newDataSource,count,pageNo,pages})
    }
    render(){
        const {pageNo,pages}=this.state;
        return(
            <div className='home_container hosting'>
                <INavBar class={`inavbar whtnavbar`} navlabel='客户份额' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
                <Search
                output={this.SelectChangeQuery}
                />
                {this.state.dataSource.length>0?
                <div>
                    <HonstingList
                    HonstingDataSource={this.state.dataSource}
                    parentProps={this.props.history}
                    />
                    <p className="noDataInfo" onClick={this.getMore}>{(parseInt(pageNo)<pages)?"展开更多":"没有更多了"}</p>
                </div>
                :<p className="noDataInfo">暂无数据</p>
                }
            </div>
        )
    }
}