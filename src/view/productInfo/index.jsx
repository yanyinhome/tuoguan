import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import Select from "../../components/select";
import Process from "../../components/Process";
import  "./index.less"
import api_services from '../../services/productInfo_api'
import {Flex,Accordion,List} from 'antd-mobile';

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
        const {searchParam,searchListDataSource}=this.state;
        const id=searchListDataSource.filter(item=>item.productNo=productNo)[0].id;
        const newSearchParam=Object.assign({},searchParam,{productNo,id})
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
const Item=({title,data})=>{
	return (
		<div className="itemClass">
			<span className="itemTitle">{title}</span><span className="itemContent">{data}</span>
		</div>
	) 
}
const Head=({title="标题",content="内容",extend=""})=>{
    return (
        <div className="AccountHead">
            {title}：<span className="content">{content}</span><span className="extend">{extend}</span>
        </div>
    )
}
const MailItem=({title="标题",child=[]})=>{
    const mailList=child.map((item,index)=>{
        return (
        <div key={index} className="childItem">{item}</div>
        )
    })
    const noData=()=>{
        return (
            <div className="noMail">
                暂无数据
            </div>
        )
    }
    return (
        <div className="mailItem">
            <div className="mailBox_head">
                {title}<span className="mailIcon"></span>
            </div>
            <div className="mailBox_child">
                {child.length?mailList:noData()}
            </div>
        </div>
    )
}
const ProcessItem=({time="2020-02-21",title="无标题"})=>{
    return(
        <div className="processItem">
            <span className="processItem_icon"></span>
            <div className="processItem_time">{time}</div>
            <div className="processItem_title">{title}</div>
        </div>
    )
}
// tab
class Tab extends Component {
    tabClick=(showFlag)=>{
        this.props.getTabFlag({showFlag})
    }
    render(){
        const {showFlag,datasource,accountList,emailMapList}=this.props;
        const baseClass=showFlag===1?"active":"";
        const accountClass=showFlag===2?"active":"";
        const mailClass=showFlag===3?"active":"";
        const processClass=showFlag===4?"active":"";
        const accounts=accountList.map(item=>{
            return (
                <div className="accountMessageBox">
                    <Head
                    title={item.reqType}
                    content={"123456"}
                    extend={item.isExamine}
                    />
                   <div className="content"> 
                    <Item title="账户名称" data={item.accname} />
                    <Item title="开户银行" data={item.bankOpen} />
                    <Item title="银行账号" data={item.bankno} />
                   </div>
                </div>
            )
        });
        const transactionList=showFlag===1?
           (
            <div>
                <Item title="备案编号" data={datasource.productNo} />
                <Item title="产品类型" data={datasource.productType} />
                <Item title="服务模式" data={datasource.serviceType} />
                <Item title="产品状态" data={datasource.status} />
                <Item title="产品成立日" data={datasource.publishDate.substring(0,10)} />
                <Item title="风险等级" data={datasource.cpjbCpfxdj} />
                <Item title="存续期" data={datasource.yzmsYjcxq} />
                <Item title="投资期到期日" data={datasource.investmentDate} />
                <Item title="退出期到期日" data={datasource.yzmsTcq} />
                <Item title="首次申购最低金额" data={datasource.sgshScsgzdjel} />
                <Item title="投资策略" data={datasource.tzqkTzcl} />
                <Item title="申购费计费模式" data={datasource.sgshSgjfmsl} />
                <Item title="最低追加申购金额" data={datasource.sgshZjshjebc} />
                <Item title="认购费计费模式" data={datasource.mjxxjfms} />
                <Item title="赎回特殊要求" data={datasource.sgshShtsyq} />
                <Item title="外包费率" data={datasource.ywxzWbfl} />
                <Item title="托管费率" data={datasource.ywxzTgfl} />
            </div>
            )
        :showFlag===2?(
            <div>
                {accounts}
                {/* <div className="accountMessageBox">
                    <Head
                    title="募集户"
                    content={"13683489570"}
                    extend={"启用"}
                    />
                   <div className="content"> 
                    <Item title="账户名称" data={"于小彤"} />
                    <Item title="开户银行" data={"中信银行西三环支行"} />
                    <Item title="银行账号" data={"6225 8801 3309 8385"} />
                   </div>
                </div>
                <div className="accountMessageBox">
                    <Head
                    title="主托管户"
                    content={"13683489570"}
                    extend={"启用"}
                    />
                    <div className="content">
                        <Item title="账户名称" data={"于小彤"} />
                        <Item title="开户银行" data={"中信银行西三环支行"} />
                        <Item title="银行账号" data={"6225 8801 3309 8385"} />
                    </div>
                </div> */}
            </div> 
            ):showFlag===3?
            (
                <div className="mail_box">
                   <MailItem
                   title={"估值接收邮箱"}
                   child={emailMapList["估值邮箱"]}
                   />
                    <MailItem
                   title={"业务联系邮箱"}
                   child={emailMapList["业务邮箱"]}
                   />
                </div> 
            ):(
                <div className="processInfoBox">
                    <Process/>
                    <h3>
                    详细流程
                    </h3>
                    <div className="process_box">
                    <ProcessItem title="准入审核" time="2020-02-21"/>
                    <ProcessItem title="个人资料修改" time="2020-02-21"/>
                    <ProcessItem title="安全密码修改" time="2020-02-21"/>
                    <ProcessItem title="股东账户加载" time="2020-02-21"/>
                    <ProcessItem title="准入完成" time="2020-02-21"/>
                    </div>
                </div> 
            )
        return(
            <div className="tab">
                <Flex>
                    <Flex.Item key="1">
                        <div className={`tabtitle ${baseClass} borderBottom`} onClick={()=>this.tabClick(1)} >
                            基本信息 
                            <div className="redBlock">
                                <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="2">
                        <div className={`tabtitle ${accountClass} borderBottom`} onClick={()=>this.tabClick(2)} >
                            帐户信息
                            <div  className="redBlock">
                              <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="3">
                        <div className={`tabtitle ${mailClass} borderBottom`} onClick={()=>this.tabClick(3)} >
                            邮箱信息 
                            <div className="redBlock">
                                <span></span>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item key="4">
                        <div className={`tabtitle ${processClass} borderBottom`} onClick={()=>this.tabClick(4)} >
                            流程信息
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
            showFlag:4,
            baseInfoData:{
                productNo:"",
                productType:"",
                serviceType:"",
                status:"",
                publishDate:"",
                cpjbCpfxdj:"",
                yzmsYjcxq:"",
                investmentDate:"",
                yzmsTcq:"",
                sgshScsgzdjel:"",
                tzqkTzcl:"",
                sgshSgjfmsl:"",
                sgshZjshjebc:"",
                mjxxjfms:"",
                sgshShtsyq:"",
                ywxzTgfl:"",
                ywxzWbfl:""
            },
            accountList:[],
            emailMapList:{
                "估值邮箱":[],
                "业务邮箱":[]
            }
        }
    }
    componentDidMount(){
        if(this.props.history.location.query){
            const {productNo,id}=this.props.history.location.query;
        }
    }
    show=(data)=>{
        console.log(data)
    }
    SelectChangeQuery=(param)=>{  
        console.log(param)
        api_services.findProduct(this.initBaseInfo,null,{id:"91b546a41d294c24aeb70d15aa9e56e5",productNo:""})
        api_services.getAccount(this.initAccountInfo,null,{productNo:"SY9077",id:""})
        api_services.getEmail(this.show,null,{productNo:"SGS030",id:""})
    }
    initBaseInfo=(baseInfoData)=>{
        this.setState({baseInfoData})
    }
    initAccountInfo=(accountList)=>{
        this.setState({accountList})
    }
    initEmaliInfo=(emailMapList)=>{
        this.setState({emailMapList})
    }
    getTabFlag=(showFlag)=>{
        this.setState(showFlag)
    }
    render(){
        return (
            <div className='home_container productInfo'>
            <INavBar class={`inavbar whtnavbar`} navlabel='产品详情' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
            <Search
                output={this.SelectChangeQuery}
            />
            <Tab
                getTabFlag={this.getTabFlag}
                showFlag={this.state.showFlag}
                datasource={this.state.baseInfoData}
                accountList={this.state.accountList}
                emailMapList={this.state.emailMapList}
            />
            </div>
        )
    }
}