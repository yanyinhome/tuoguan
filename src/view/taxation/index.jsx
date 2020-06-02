import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import Select from "../../components/select";
import  "./index.less"
import api_services from '../../services/taxaction_api'


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
                productNo:"",
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
    getProductParam=(productNo)=>{
        const {searchParam}=this.state;
        const newSearchParam=Object.assign({},searchParam,{productNo})
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
                val="productNo"
                keyType="id"
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
class AccordionList extends Component{
    constructor(props){
        super(props)
        this.state={
            pageSize:"2",
            pageNo:"1",
            ListData:[],
            count:"",
            pages:0
        }
    }
    componentWillReceiveProps(nextprops){       
        const {active,AccordionData,param}=nextprops;
        const {pageSize,pageNo}=this.state;
        // if(active===AccordionData.title&&param.productNo){
        if(active===AccordionData.title){
            // api_services.getproductTaxfee(this.showDetail,null,{...param,type:AccordionData.type,pageSize,pageNo})  
            api_services.getproductTaxfee(this.showDetail,null,{productNo:"SCW372",type:"计提管理费",pageSize,pageNo})  
        }
    }
    showDetail=(data)=>{
        const {count,list,pageNo,pages}=data;
        this.setState({count,ListData:list,pageNo,pages})
    }
    getMore=()=>{
        console.log(this.props.param)
        const {pageNo,pages,pageSize}=this.state;
        if((parseInt(pageNo)<pages)){
            api_services.getproductTaxfee(this.addListData,null,{productNo:"SCW372",type:"计提管理费",pageSize,pageNo:(pageNo+1)}) 
        }
    }
    addListData=(data)=>{
        const {count,list,pageNo,pages}=data;
        const {ListData}=this.state;
        const newListData=ListData.concat(list);
        this.setState({pages,pageNo,ListData:newListData,count})

    }
    restmax=()=>{
        this.setState({listMax:4})
    }
    render(){
        const {AccordionData}=this.props;
        const {ListData,pageNo,pages}=this.state;
        const AccordionArr=ListData.map((item,inde)=>(
            <div key={inde} className="bodyBox">
                <div className="listLeft">{item.rq.substring(0,10)}</div>
                <div className="listRight">{item.je}</div>
            </div>
            ))
        return(
            <div className={`accordionListBox ${this.props.active===AccordionData.title?"active":""}`}>
                <div className='ListHead' onClick={()=>{this.restmax();this.props.handclick(AccordionData.title)}}>
                    {AccordionData.title}
                    <span className={`rightIcon ${this.props.active===AccordionData.title?"reduce":"add"}`}></span>
                </div>
                <div className={`listBody ${this.props.active===AccordionData.title?"show":"hide"}`}>
                    {AccordionArr}
                <p className="more" onClick={this.getMore}>{(parseInt(pageNo)<pages)?"展开更多":"没有更多了"}</p>
                </div>
            </div>
        )
    }
}
// 手风琴组件
class AccordionContent extends Component{
    constructor(props){
        super(props)
        this.state={
            active:-1
        }
    }
    handclick=(title="")=>{
        let newactive=this.props.AccordionDataSource.findIndex(element=>{return element.title===title});
        const {active}=this.state;
        if(active===newactive){newactive=-1};
        this.setState({active:newactive})
    }
      render() {
        const {active}=this.state;
        const {param}=this.props;
        const activeTitle=active===-1?"":this.props.AccordionDataSource[this.state.active].title;
        const  content=this.props.AccordionDataSource.map(
            (item,ind)=><AccordionList AccordionData={item} active={activeTitle} key={`${item.title}${ind}`} param={param} handclick={this.handclick} />
        )
        return (
          <div style={{margin:"60px 30px"}}>
              {content}
          </div>
        );
      }
}
export default class cunstomerShare extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource:[
                {title:"托管费",type:"计提托管费"},
                {title:"管理费",type:"计提管理费"},
                {title:"运营服务费",type:"计提运营服务费"},
                {title:"销售服务费",type:"计提销售服务费"},
                {title:"投顾费",type:"计提投顾费"},
                {title:"业绩报酬",type:"计提业绩报酬"},
                {title:"增值税",type:"计提增值税"},
            ],
            param:{},
            cpId:"6BA83843F9346DC3E053281C110A4F12",
        }
    }
    componentDidMount=()=>{
        const {cpId}=this.state;
        // api_services.getOneProductTaxfee(this.show,this.show,{cpId,productNo:""})  
    }
    SelectChangeQuery=(param)=>{
        // param.cpId=param.productNo?"":this.state.cpId;
        this.setState({param})
    }
    render(){
        return(
            <div className='home_container'>
                <INavBar class={`inavbar whtnavbar`} navlabel='税费查询' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
                {/* <div className="margin160"></div> */}
                <Search
                output={this.SelectChangeQuery}
                />
                <AccordionContent
                AccordionDataSource={this.state.dataSource}
                param={this.state.param}
                />
            </div>
        )
    }
}