import React, {Component} from 'react';
import INavBar from "../../components/i-navbar";
import echarts from 'echarts';
import Select from "../../components/select";
import api_services from '../../services/netWorth_api'
import util from '../../utils/bd_utils';
import './netWorth.less'


//搜索框
// class Search extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render () {
//         return (
//             <div id="search" className={`search-box`}>
//                 <section className={`search`}>
//                     <span className={`title`}>产品名称</span>
//                     <div className={`ipt-search`}>
//                         <select name="" id="" className='seclect-box'>
//                             <option value="">福建滚雪球卓越一号私募基金</option>
//                         </select>
//                     </div>
//                 </section>
//                 <section className={`search`}>
//                     <span className={`title`}>产品对比</span>
//                     <div className={`ipt-search`}>
//                         <select name="" id="" className='seclect-box'>
//                             <option value="">请选择</option>
//                         </select>
//                     </div>
//                 </section>
//                 <section className={`search`}>
//                     <span className={`title`}>参考指数</span>
//                     <div className={`ipt-search`}>
//                         <select name="" id="" className='seclect-box'>
//                             <option value="">泸深300指数</option>
//                             <option value="">中证500指数</option>
//                             <option value="">创业板指数</option>
//                         </select>
//                     </div>
//                 </section>
//             </div>
//         )

//     }
// }
//搜索框
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchListDataSource:[],
            searchListContrastDataSource:[],
            searchReferenceExponentList:[
                {
                    text:"沪深300指数",
                    id:"0",
                    val:"300"
                },
                {
                    text:"中证500指数",
                    id:"1",
                    val:"500"
                },
                {
                    text:"创业板指数",
                    id:"2",
                    val:"chuang"
                },
            ],
            searchParam:{
                productNo:"",
                id:""
             },
             searchParam2:{
                productNo:"",
                id:""
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
        this.setState({searchListDataSource:list,searchListContrastDataSource:list})
    }
    getProductInfo=(productNo)=>{
        if(productNo){
            const {searchListDataSource}=this.state;
            const selectOption=searchListDataSource.filter(item=>item.productNo===productNo)[0];
            const id=selectOption.id;
            const productName=selectOption.productName;
            return {productNo,id,productName}
        }else{
            return {};
        }
    }
    getProductParam=(productNo)=>{
        const newSearchParam=this.getProductInfo(productNo)
        this.setState({searchParam:newSearchParam},()=>{this.props.output(newSearchParam,1)})
    }
    getProductParam2=(productNo)=>{
        const newSearchParam=this.getProductInfo(productNo)
        this.setState({searchParam2:newSearchParam},()=>{this.props.output(newSearchParam,2)}) 
    }
    render () {
        return (
            <div id="search" className={`search-box`}>
                <Select
                key="0"
                title="产品名称"
                data={this.state.searchListDataSource}
                text="productName"
                val="productNo"
                keyType="id"
                handleChange={this.getProductParam}
                define={true}
                />
                <Select
                key="1"
                title="产品对比"
                data={this.state.searchListContrastDataSource}
                text="productName"
                val="productNo"
                keyType="id"
                handleChange={this.getProductParam2}
                define={true}
                />
                <Select
                key="2"
                title="参考指数"
                data={this.state.searchReferenceExponentList}
                text="text"
                val="val"
                keyType="id"
                // handleChange={this.getProductParam}
                />
            </div>
        )

    }
}
//标签页
class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:0,
        }
    }
    handToggle = (e) => {
        if(this.state.status === 1){
            this.setState({
                status:0,
            })
        }else{
            this.setState({
                status:1,
            })
        }
    }
    render () {
        return (
            <div>
                <div className={`tabs`}>
                    <div className={`item-tab`}>
                        <button className={`${this.state.status===0 ? 'active':"" }`} onClick={this.handToggle}>净值曲线</button>
                    </div>
                    <div className={`item-tab`}>
                        <button className={`${this.state.status===1 ? 'active':"" }`} onClick={this.handToggle}>增长率曲线</button>
                    </div>
                    <div className={`item-tab data-sel`}>
                        <select name="" id="" className={`sel`}>
                            <option value="">近一周</option>
                            <option value="">近一个月</option>
                            <option value="">近三个月</option>
                            <option value="">近一年</option>
                            <option value="">近两年</option>
                        </select>
                    </div>
                </div>
                <div className={`info-lists`}>
                    <div className={`info-list`}>
                        <div>最新净值：</div>
                        <div>{this.props.lastNetWorth.enDwjz||0}</div>
                    </div>
                    <div className={`info-list`}>
                        <div>累计净值：</div>
                        <div>{this.props.lastNetWorth.enLjdwjz||0}</div>
                    </div>
                    <div className={`info-list`}>
                        <div>净值增长率：</div>
                        <div>{this.props.lastNetWorth.enLjdwjzRate||0}</div>
                    </div>
                </div>
                <div style={{display: `${this.state.status === 0 ? 'block' : 'none'}`}}>
                    <LineChart
                        productNoList2={this.props.productNoList2}
                        productNoList={this.props.productNoList}
                        productNo={this.props.productNo}
                        productNo2={this.props.productNo2}
                    ></LineChart>
                </div>
                <div style={{display: `${this.state.status === 1 ? 'block' : 'none'}`}}>
                    <LineAdd 
                        productNoList2={this.props.productNoList2}
                        productNoList={this.props.productNoList}
                        productNo={this.props.productNo}
                        productNo2={this.props.productNo2}
                     ></LineAdd>
                </div>
            </div>
        )
    }
}
//折线图
class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option:{
                title: {
                    text: '折线图堆叠',
                    show: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['基金净值', '累计净值'],
                    bottom: 10
                },
                grid: {
                    x2: 45,
                    y: 35
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ["3-1","3-2","3-3"]
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '基金净值',
                        // min: function(value){
                        //     return value.min - 0.10;
                        // },
                        // max: function(value){
                        //     return value.max + 0.10
                        // }
                    },
                    {
                        type: 'value',
                        name: '累计净值',
                        // min: function(value){
                        //     return value.min - 500
                        // },
                        // max: function(value){
                        //     return value.max + 500
                        // },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '基金净值',
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#D0B07C',
                        },
                        lineStyle: {
                            color: '#D0B07C',
                        },
                        data: [0.1,0.5,0.3]
                    },
                    {
                        name: '累计净值',
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#EC3E42',
                        },
                        lineStyle: {
                            color: '#EC3E42',
                        },
                        yAxisIndex: 1,
                        data: [10,20,15]
                    },
                ]
            }
        }
    }
    componentDidMount = () => {
        let chart = echarts.init(document.getElementById('lineChart'));
        chart.setOption(this.state.option);
    }
    componentWillReceiveProps(nextProps){
        let chart = echarts.init(document.getElementById('lineChart'));
        let nextxAxisData=[];
        let nextProductNoSeries=[]
        let nextProductNo2Series=[]
        const {productNoList=[],productNoList2=[],productNo={},productNo2={}}=nextProps
        if(productNo.productName&&productNo2.productName){
            for(let i=0;i<productNoList.length;i++){
                nextxAxisData.push(productNoList[i].drq.substring(0,10))
                nextProductNoSeries.push(productNoList[i].enDwjz)
                nextProductNo2Series.push(productNoList2[i].enDwjz)
            }
            const newOption = {
                title: {
                    text: '折线图堆叠',
                    show:false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [productNo.productName, productNo2.productName],
                    height: 30,
                    itemWidth:12,
                    itemHeight: 20,
                    textStyle:{
                        lineHeight:20,
                    },
                    bottom: 2,
                    formatter: function(value){
                        let tip1 = '';
                        let tip = '';
                        let len = value.length;
                        if(len > 7){
                            let l = Math.ceil(len/7);
                            for(var i = 1; i <= l; i++){
                                if(i < l){
                                    tip1 += value.slice(i*7-7, i*7) + '\n';
                                }else if(i === l){
                                    tip = tip1 + value.slice((l -1)*7,len)
                                }
                            }
                            return tip
                        }else{
                            tip = value;
                            return tip;
                        }
                    },
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
                    data: nextxAxisData
                    // data: ['2020-03-01', '2020-03-05', '2020-03-09', '2020-03-13', '2020-03-17', '2020-03-21']
                },
                yAxis: {
                    type: 'value',
                    name:"基金净值"
                },
                series: [
                    {
                        name: productNo.productName,
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#D0B07C',
                        },
                        lineStyle: {
                            color: '#D0B07C',
                        },
                        data: nextProductNoSeries
                        // data: [3670, 3710, 3780, 3800, 3740, 3700]
                    },
                    {
                        name: productNo2.productName,
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#EC3E42',
                        },
                        lineStyle: {
                            color: '#EC3E42',
                        },
                        data: nextProductNo2Series
                        // data: [3800, 3900, 3850, 3750, 3846, 3987]
                    }
                ]
            };
            chart.setOption(newOption,true)
        }else if(productNo.productName){
            for(let i=0;i<productNoList.length;i++){
                nextxAxisData.push(productNoList[i].drq.substring(0,10))
                nextProductNoSeries.push(productNoList[i].enDwjz)
                nextProductNo2Series.push(productNoList2[i].enLjdwjz)
            }
            const newOption={
                title: {
                    text: '折线图堆叠',
                    show: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['基金净值', '累计净值'],
                    bottom: 10
                },
                grid: {
                    x2: 45,
                    y: 35
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: nextxAxisData
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '基金净值',
                        // min: function(value){
                        //     return value.min - 0.10;
                        // },
                        // max: function(value){
                        //     return value.max + 0.10
                        // }
                    },
                    {
                        type: 'value',
                        name: '累计净值',
                        // min: function(value){
                        //     return value.min - 500
                        // },
                        // max: function(value){
                        //     return value.max + 500
                        // },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '基金净值',
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#D0B07C',
                        },
                        lineStyle: {
                            color: '#D0B07C',
                        },
                        data: nextProductNoSeries
                    },
                    {
                        name: '累计净值',
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#EC3E42',
                        },
                        lineStyle: {
                            color: '#EC3E42',
                        },
                        yAxisIndex: 1,
                        data: nextProductNo2Series
                    },
                ]
            }
            chart.setOption(newOption,true)
        }

    }
    render() {
        return (
            <div className='echart-box'>
                <div id="lineChart" className={`line-chart`}></div>
            </div>
        )
    }
}
//增长折线图
class LineAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    initEcharts = () => {
        let chart = echarts.init(document.getElementById('AddLine'));
        let option = {
            title: {
                text: '折线图堆叠',
                show: false
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['福建滚雪球一号私募基金', '福建至诚滚雪球二号私募基金'],
                height: 30,
                itemWidth:12,
                itemHeight: 20,
                textStyle:{
                    lineHeight:20,
                },
                formatter: function(value){
                    let tip1 = '';
                    let tip = '';
                    let len = value.length;
                    if(len > 7){
                        let l = Math.ceil(len/7);
                        for(var i = 1; i <= l; i++){
                            if(i < l){
                                tip1 += value.slice(i*7-7, i*7) + '\n';
                            }else if(i === l){
                                tip = tip1 + value.slice((l -1)*7,len)
                            }
                        }
                        return tip
                    }else{
                        tip = value;
                        return tip;
                    }
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
            series: [
                {
                    name: '福建滚雪球一号私募基金',
                    type: 'line',
                    symbol: "none",
                    smooth:true,
                    itemStyle: {
                        color: '#D0B07C',
                    },
                    lineStyle: {
                        color: '#D0B07C',
                    },
                    data: [3670, 3710, 3780, 3800, 3740, 3700]
                },
                {
                    name: '福建至诚滚雪球二号私募基金',
                    type: 'line',
                    symbol: "none",
                    smooth:true,
                    itemStyle: {
                        color: '#EC3E42',
                    },
                    lineStyle: {
                        color: '#EC3E42',
                    },
                    data: [3800, 3900, 3850, 3750, 3846, 3987]
                }
            ]
        };
        chart.setOption(option)
        window.addEventListener('resize',function(){
            chart.resize();
        })

    }
    componentDidMount(){
        this.initEcharts()
    }
    componentWillReceiveProps(nextProps) {
        let chart = echarts.init(document.getElementById('AddLine'));
        let nextxAxisData=[];
        let nextProductNoSeries=[]
        let nextProductNo2Series=[]
        const {productNoList=[],productNoList2=[],productNo={},productNo2={}}=nextProps
        if(productNo.productName&&productNo2.productName){
            for(let i=0;i<productNoList.length;i++){
                nextxAxisData.push(productNoList[i].drq.substring(0,10))
                nextProductNoSeries.push(productNoList[i].enLjdwjzRate)
                nextProductNo2Series.push(productNoList2[i].enLjdwjzRate)
            }
            const newOption = {
                title: {
                    text: '折线图堆叠',
                    show: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [productNo.productName, productNo2.productName],
                    height: 30,
                    itemWidth:12,
                    itemHeight: 20,
                    textStyle:{
                        lineHeight:20,
                    },
                    formatter: function(value){
                        let tip1 = '';
                        let tip = '';
                        let len = value.length;
                        if(len > 7){
                            let l = Math.ceil(len/7);
                            for(var i = 1; i <= l; i++){
                                if(i < l){
                                    tip1 += value.slice(i*7-7, i*7) + '\n';
                                }else if(i === l){
                                    tip = tip1 + value.slice((l -1)*7,len)
                                }
                            }
                            return tip
                        }else{
                            tip = value;
                            return tip;
                        }
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
                    data: nextxAxisData
                },
                yAxis: {
                    type: 'value',
                    //name: '基金净值',
                    // min: function(value){
                    //     return value.min - 500;
                    // },
                    // max: function(value){
                    //     return value.max + 500
                    // }
                },
                series: [
                    {
                        name: productNo.productName,
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#D0B07C',
                        },
                        lineStyle: {
                            color: '#D0B07C',
                        },
                        data: nextProductNoSeries
                    },
                    {
                        name: productNo2.productName,
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#EC3E42',
                        },
                        lineStyle: {
                            color: '#EC3E42',
                        },
                        data: nextProductNo2Series
                    }
                ]
            };
            chart.setOption(newOption)
        }else if(productNo.productName){
            for(let i=0;i<productNoList.length;i++){
                nextxAxisData.push(productNoList[i].drq.substring(0,10))
                nextProductNoSeries.push(productNoList[i].enLjdwjzRate)
            }
            const newOption = {
                title: {
                    text: '折线图堆叠',
                    show: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [productNo.productName],
                    height: 30,
                    itemHeight: 20,
                    textStyle:{
                        lineHeight:20,
                    },
                    // formatter: function(value){
                    //     let tip1 = '';
                    //     let tip = '';
                    //     let len = value.length;
                    //     if(len > 7){
                    //         let l = Math.ceil(len/7);
                    //         for(var i = 1; i <= l; i++){
                    //             if(i < l){
                    //                 tip1 += value.slice(i*7-7, i*7) + '\n';
                    //             }else if(i === l){
                    //                 tip = tip1 + value.slice((l -1)*7,len)
                    //             }
                    //         }
                    //         return tip
                    //     }else{
                    //         tip = value;
                    //         return tip;
                    //     }
                    // },
                    bottom: 10
                },
                grid: {
                    x2: 45,
                    y: 35,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: nextxAxisData
                },
                yAxis: {
                    type: 'value',
                    //name: '基金净值',
                    // min: function(value){
                    //     return value.min - 500;
                    // },
                    // max: function(value){
                    //     return value.max + 500
                    // }
                },
                series: [
                    {
                        name: productNo.productName,
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            color: '#D0B07C',
                        },
                        lineStyle: {
                            color: '#D0B07C',
                        },
                        data: nextProductNoSeries
                    },
                   
                ]
            };
            console.log(2)
            chart.setOption(newOption)
        }
    }

    render() {
        return (
            <div className='echart-box'>
                <div id="AddLine" className={`line-chart`}></div>
            </div>
        )
    }
}
//净值曲线
class NetWorthCover extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
        const productList=this.props.productNetworthList.map((item,index)=>{
            return (
                <ul key={index}>
                    <li>{item.drq.substring(0,10)}</li>
                    <li>{item.enDwjz}</li>
                    <li>{item.enZcfe}</li>
                </ul>
            )
        });
        return (
            <section className={`history-lists`}>
                <div className='title'>
                    <div className='titleText'>产品列表</div>
                    <div className='more' onClick={this.props.goToMore}>更多&gt;</div>
                </div>
                <div className={`lists`}>
                    <ul>
                        <li>净值日期</li>
                        <li>单位净值</li>
                        <li>持有份额</li>
                    </ul>
                    {productList}
                </div>
            </section>
        )
    }
}
class netWorth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 产品列表
            productNetworthList:[
            ],
            // 产品最新信息
            lastNetWorth:{              
            },
            // 产品
            product:{},
            // 对比产品
            contrastProduct:{},
            // 产品1view Array
            productNoList:[],
            // 产品2view Array
            productNoList2:[],
            // 参考指数
            idnexType:"",
            // 周期
            dataType:"3",
            // 页码参数
            pagination:{
                pageNo:1,
                pageSize:10,
            }
        }
    };
    getDate=(dataType="3")=>{
        const newDate=new Date();
        const endTime= util.dayFormat(newDate)
        let startTime;
        if(dataType==="0"){
            startTime=util.dayFormat(new Date(newDate.getTime()-1000*60*60*24*7));
        }else if(dataType==="1"){
            startTime=util.dayFormat(new Date(newDate.getTime()-1000*60*60*24*30*1));
        }else if(dataType==="3"){
            startTime=util.dayFormat(new Date(newDate.getTime()-1000*60*60*24*30*3));
        }else{
            startTime=util.dayFormat(new Date(newDate.getTime()-1000*60*60*24*30*12));
        }
        return {startTime,endTime}  
    }
    SelectChangeQuery=(param,type)=>{
        param.productNo="ST3343";
        const {pagination,product,contrastProduct}=this.state;
        const {startTime,endTime}=this.getDate()
        const {productNo}=param;
        if(type===1){
            api_services.networthList(this.initProductSearch,this.show,{productNo,startTime,endTime,...pagination})
            api_services.networthListView(this.initNetWorthView,this.show,{productNo,productNo2:contrastProduct.productNo||"",startTime,endTime,...pagination})
            console.log(param)
            this.setState({product:{...param}})
        }else if(type===2){
            api_services.networthListView(this.initNetWorthView,this.show,{productNo:product.productNo||"",productNo2:productNo,startTime,endTime,...pagination})
            this.setState({contrastProduct:{...param}})
            console.log(param)
        }
    }
    // queryview
    show=(data)=>{
        console.log(data)
    }
    initNetWorthView=(data)=>{
        const {lastNetWorth,productNo=[],productNo2=[]}=data;
        this.setState({lastNetWorth,productNoList:productNo,productNoList2:productNo2})
    }
    initProductSearch=(data)=>{
        const {list=[]}=data;
        this.setState({productNetworthList:list})
    }
    goToMore=()=>{
        const {pagination,product:{productNo}}=this.state
        const option={pathname:"historyNetWorth",query:{...pagination,productNo}}
        this.props.history.push(option)
    }
    render() {
        return (
            <section className={`home_container`}>
                <INavBar class={`inavbar whtnavbar`} navlabel='净值查询' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}}]} />
                <Search
                output={this.SelectChangeQuery}
                />
                <Tabs
                lastNetWorth={this.state.lastNetWorth}
                productNoList={this.state.productNoList}
                productNoList2={this.state.productNoList2}
                productNo={this.state.product}
                productNo2={this.state.contrastProduct}
                ></Tabs>
                <NetWorthCover
                productNetworthList={this.state.productNetworthList}
                goToMore={this.goToMore}
                />
            </section>
        )
    }
}
export default netWorth;