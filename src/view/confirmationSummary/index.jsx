import React, {Component} from 'react';
import INavBar from "../../components/i-navbar";
import echarts from 'echarts';
import './index.less'
import Select from "../../components/select";
import api_services from '../../services/confirmationSummary_api'
import util from '../../utils/bd_utils';

//搜索框
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchListDataSource:[],
            timeType:[
                {
                name:"近三个月",
                val:"0",
                id:"0",
                },
                {
                name:"近一年",
                val:"1",
                id:"1",
                },
            ],
            searchParam:{
                productNo:"",
                dataType:"0",
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

// 交易记录列表
class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    initEcharts = (option) => {
        let chart = echarts.init(document.getElementById('LineChartSummary'));
        chart.setOption(option)
        window.addEventListener('resize',function(){
            chart.resize();
        })

    }
    componentDidMount() {
        console.log(this.props.option)
        this.initEcharts(this.props.option)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.option)
        let chart = echarts.init(document.getElementById('LineChartSummary'));
        chart.setOption(nextProps.option,true)
    }
    render() {
        return (
            <div className='echart-box'>
                <div id="LineChartSummary" className={`line-chart`}></div>
            </div>
        )
    }
}
const HistoryList=({dataSource=[],parentProps,productNo})=>{
    const gotoSummary=(e,param)=>{
        e.stopPropagation()
        const newParam=Object.assign({},param,{productNo});
        const option={pathname:"summaryTurnover",query:newParam}
        parentProps.push(option)
        
    }
    const goDetail=(param)=>{
        const newParam=Object.assign({},param,{productNo});
        const option={pathname:"confirmationSummaryDetail",query:newParam}
        parentProps.push(option)
    }
    return dataSource.map((item,ind)=>{
       return ( 
        <div className="historyItem" key={ind}>
            <div className="itemHead" onClick={()=>goDetail(item)}>
                {item.transactioncfmdate.substring(0,10)} <span className="icon"></span>
            </div>
            <div className="itemContent" onClick={()=>goDetail(item)}>
                <div className="contentLeft">
                    手续费：<span className="number">{item.sumcharge}</span> 
                </div>
                <div className="contentRight">
                    <div >
                        净额：<span className="number">{item.sumconfirmedamount}</span><span className="grey">{item.label||"无"}</span>
                    </div>
                    <div >
                         份额：<span className="number">{item.sumconfirmedvol}</span><span className="red" onClick={e=>{gotoSummary(e,item)}}></span>
                     </div>
                </div>
            </div>
        </div>
       )
    })
}
class ConfirmationSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productvolList:[],
            transInfoList:[],
            param:{},
            option:{
                title: {
                    text: '折线图堆叠',
                    show: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['福建滚雪球一号私募基金'],
                    height: 30,
                    itemWidth:12,
                    itemHeight: 20,
                    textStyle:{
                        lineHeight:20,
                    },
                    bottom: 2
                },
                grid: {
                    x2: 45,
                    y: 35,
                    left: 40,
                    bottom: 70
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2020-03-01', '2020-03-05', '2020-03-09', '2020-03-13', '2020-03-17', '2020-03-21']
                },
                yAxis: {
                    type: 'value',
                    //name: '基金净值',
                    min: function(value){
                        return value.min - 500;
                    },
                    max: function(value){
                        return value.max + 500
                    }
                },
                series: 
                    {
                        name: '福建滚雪球一号私募基金',
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#EC3E42',
                        },
                        lineStyle: {
                            color: '#EC3E42',
                        },
                        data: [3670, 3710, 3780, 3800, 3740, 3700]
                    },
            }
        }
    };
    componentDidMount=()=>{
        this.getSelectParam({dataType:"1"})
    }
    getSelectParam=(param)=>{
        param.productNo="ST3343";
        const newDate=new Date();
        const endTime= util.dayFormat(newDate)
        let startTime;
        if(param.dataType==="0"){
             startTime=util.dayFormat(new Date(newDate.getTime()-1000*60*60*24*30*3));
        }else{
             startTime=util.dayFormat(new Date(newDate.getTime()-1000*60*60*24*30*12));
        }
        api_services.productShareList(this.show,null,{productNo:"ST3343",startTime,endTime})         
        this.setState({param})
    }
    show=(data)=>{
        const {option}=this.state
        const {transInfoList,productvolList}=data
        const lineData=[];
        const tiemData=[];
        productvolList.forEach(item=>{
            let time=item.drq.substring(0,10)
            let data=item.enZcfe
            lineData.push(data);
            tiemData.push(time);
        })
        option.xAxis.data=tiemData.reverse();
        option.series.data=lineData.reverse();
        this.setState({transInfoList,productvolList,option})
    }
    render() {
        return (
            <section className={`home_container confirmationBox`}>
                <INavBar class={`inavbar whtnavbar`} navlabel='确认汇总' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}}]} />
                <Search
                output={this.getSelectParam}
                />
                <LineChart
                option={this.state.option}
                />
                <HistoryList
                    parentProps={this.props.history}
                    dataSource={this.state.transInfoList}
                    productNo={this.state.param.productNo}
                />
            </section>
        )
    }
}
export default ConfirmationSummary;