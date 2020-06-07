import React, { Component } from 'react'
import banner_data from '../../../public/config/data/home_topics_banner.json';
import gride_data from '../../../public/config/data/home_icon_grids.json';
import newInfoData from '../../../public/config/data/home_new_notice.json';

import { Carousel, Modal, Grid } from 'antd-mobile';
import INavBar from "../../components/i-navbar";
import Tip from '../../components/tip';
import '../../css/hosting/hosting.less';
import echarts from 'echarts/lib/echarts'
// import ProductDetail from './product/productDetail'
import 'echarts/lib/chart/gauge' // 
import 'echarts/lib/chart/pie' // 
import 'echarts/lib/component/tooltip'; //eachart 提示
import 'echarts/lib/component/title';// title 组件
import api_services from '../../services/home_api';
import 'antd/dist/antd.css';

// banner
class HomeCarousel extends Component {
    state = {
        data: [],
        banner_dura: 3000
    }
    componentDidMount() {
        this.setState({
            data: banner_data.data.items,
            banner_dura: banner_data.data.dura * 1000
        });
    }
    render() {
        return (
            <div className='home_Carousel'>
                <Carousel dotStyle={{ backgroundColor: 'lightgray' }} dotActiveStyle={{ backgroundColor: 'white' }}
                    autoplay={true}
                    infinite
                    autoplayInterval={this.state.banner_dura}
                    cellSpacing={0}
                >
                    {this.state.data.map(val => (
                        <div className='imageContainer' key={val.id} style={{ display: 'inline-block' }}>
                            <img src={process.env.PUBLIC_URL + '/config/data/home_topics_banner_img/' + val.id + '.png'} alt="" style={{ verticalAlign: 'top' }} />
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    }
}
// menu
class HomeServiceMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    goGrideItem = (record) => {
        if (record.route) {
            // console.log(this.props)
            this.props.parentProps.push(record.route);
        } else {
            Tip.info("服务正在建设中...")
        }
    }
    render() {
        const getMenuData = gride_data.data.items.map((item) => ({
            icon: `${process.env.PUBLIC_URL}/config/data/${item.img}`,
            text: `${item.title}`,
            route: `${item.route}`
        }))
        return (
            <Grid data={getMenuData}
                hasLine={false}
                columnNum={4}
                renderItem={dataItem => (
                    <div className='menu'>
                        <img src={dataItem.icon} style={{ width: 48, height: 48 }} alt="" />
                        <div className='title'>
                            <span>{dataItem.text}</span>
                        </div>
                    </div>
                )}
                square={false}
                itemStyle={{
                    margin: "0.2rem 0",
                }}
                onClick={this.goGrideItem}
            />
        );
    }
}
class NewInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    goNotice = (flag) => {
        const option = {
            pathname: "notice",
            query: { flag }
        }
        this.props.parentsProps.push(option)
    }
    render() {
        const newInfo = newInfoData.data.items.map((item, index) => {
            return (
                <div className="item" key={item.img} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/config/data/" + item.img + ")" }} onClick={() => { this.goNotice(index) }}>
                    {/* 新业务 */}
                    <span> {item.title} </span>
                </div>
            )
        })
        return (
            <section className='newInfo'>
                {newInfo}
            </section>
        );
    }
}
class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [
                {
                    name: "1",
                    value: 53211,
                    unit: '元'
                },
                {
                    name: "2",
                    value: 42111,
                    unit: '元'
                },
                {
                    name: "3",
                    value: 81711,
                    unit: '元'
                }
            ]
        }
    }

    componentDidMount = () => {
        var gaugeChart = echarts.init(document.getElementById('gauge'))
        const color = ['#E83637', '#D0B07C', '#A6B6C8'];
        let arrName = [];
        let arrValue = [];
        let sum = 0;
        let pieSeries = [];
        let lineYAxis = [];

        // 数据处理
        this.state.chartData.forEach((v, i) => {
            arrName.push(v.name);
            arrValue.push(v.value);
            sum = sum + v.value;
        })

        // 图表option整理
        this.state.chartData.forEach((v, i) => {
            pieSeries.push({
                type: 'pie',
                startAngle: -135,
                clockWise: true,
                hoverAnimation: false,
                radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
                center: ["50%", "50%"],
                label: {
                    show: false
                },
                data: [{
                    value: v.value,
                    name: v.name
                }, {
                    value: sum - v.value,
                    name: '',
                    itemStyle: {
                        color: "rgba(0,0,0,0)"
                    }
                }]
            });
            pieSeries.push({
                type: 'pie',
                silent: true,
                startAngle: -135,
                z: 1,
                clockWise: true, //顺时加载
                hoverAnimation: true, //鼠标移入变大
                radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
                center: ["50%", "50%"],
                label: {
                    show: false
                },
                data: [{
                    value: 7.5,
                    itemStyle: {
                        color: "#F8F8f8"
                    }
                }, {
                    value: 2.5,
                    name: '',
                    itemStyle: {
                        color: "rgba(0,0,0,0)"
                    }
                }]
            });
        })

        let option = {
            backgroundColor: '#fff',
            color: color,
            grid: {
                top: '15%',
                bottom: '54%',
                left: "30%",
                containLabel: false
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: function (params) {
                        let item = this.state.chartData[params];
                        // console.log(item)
                        return '{line|}{circle|●}{name|' + item.name + '}{bd||}{percent|' + item.percent + '}{value|' + item.value + '}{unit|元}'
                    },
                    interval: 0,
                    inside: true,
                    textStyle: {
                        color: "#333",
                        fontSize: 14,
                        rich: {
                            line: {
                                width: 170,
                                height: 10,
                            },
                            name: {
                                color: '#666',
                                fontSize: 14,
                            },
                            bd: {
                                color: '#ccc',
                                padding: [0, 5],
                                fontSize: 14,
                            },
                            percent: {
                                color: '#333',
                                fontSize: 14,
                            },
                            value: {
                                color: '#333',
                                fontSize: 16,
                                fontWeight: 500,
                                padding: [0, 0, 0, 20]
                            },
                            unit: {
                                fontSize: 14
                            }
                        }
                    },
                    show: true
                },
                data: lineYAxis
            }],
            xAxis: [{
                show: false
            }],
            series: pieSeries
        };

        gaugeChart.setOption(option)

    }
    render() {
        return (
            <div className='echartBox'>
                <div id="gauge"></div>
            </div>
        );
    }
}
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    goToDetail = (param) => {
        const option = { pathname: "productInfo", query: param }
        this.props.parentProps.push(option)
    }
    render() {
        const { dataSource = [] } = this.props;
        const productList = dataSource.map((item, index) => {
            return (
                <div key={index}>
                    <div className="productItem" onClick={(item) => { this.goToDetail(item) }}>
                        <div className='proSubject'>
                            <div className='subject'> {item.productName}</div>
                            <div className='count'> {item.productJz || 0}</div>
                        </div>
                        <div className='proSubject'>
                            <div className='proTag'>
                                <span className='code'> {item.productNo} </span>
                                <span className='proType'> {item.publishStatus} </span>
                            </div>
                            <div className='time'> {item.publishDate.substring(0, 10)}</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {productList}
            </div>
        );
    }
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnStyle: {
                borderRadius: "50%"
            },
            modal: false,
            searchListDataSource: [],
            productListData: [],
            productCountInfo: {
                "产品总数": 1,
                "募集数量": 0,
                "客户数": 0,
                "已成立数量": 0,
                "已清盘数量": 0,
                "总份额": 0,
                "总资产": 0.00,
            }
        }
    }
    componentDidMount() {
        api_services.getProductList(this.initSearch, this.fail, {})
        api_services.productProductCount(this.InitProductProductCount, null, { cpId: "6BA83843F9346DC3E053281C110A4F12" })
        api_services.getAllProduct(this.InitProductList, this.fail, { cpId: "605D4531519C2093E053281C110A017B" })
        this.drag("customerService")
    }
    drag = (id) => {
        var oDiv = document.getElementById(id);

        let disX, disY, moveX, moveY, L, T;

        oDiv.addEventListener('touchstart', function (e) {
            e.preventDefault();
            disX = e.touches[0].clientX - this.offsetLeft;
            disY = e.touches[0].clientY - this.offsetTop;
        });
        oDiv.addEventListener('touchmove', function (e) {
            e.preventDefault();
            L = e.touches[0].clientX - disX;
            T = e.touches[0].clientY - disY;
            if (L < 0) {
                L = 0;
            } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
                L = document.documentElement.clientWidth - this.offsetWidth;
            }

            if (T < 0) {
                T = 0;
            } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
                T = document.documentElement.clientHeight - this.offsetHeight;
            }
            moveX = L + 'px';
            moveY = T + 'px';
            this.style.left = moveX;
            this.style.top = moveY;
        });
    }
    show = (data) => {
        console.log(data)
    }
    InitProductProductCount = (productCountInfo) => {
        this.setState({ productCountInfo })
    }
    InitProductList = (data) => {
        const { list: productListData } = data
        this.setState({ productListData })
    }
    initSearch = (data) => {
        const { list } = data;
        this.setState({ searchListDataSource: list })
    }
    onClose = key => () => {
        const el = document.querySelectorAll('.am-modal-wrap')
        const mask = document.querySelectorAll('.am-modal-mask')
        el[0].style.display = 'none'
        mask[0].style.display = 'none'
        // this.setState({
        //   [key]: false,
        // });
    }
    fail = (data) => {
        Tip.fail("请求异常！")
    }
    showFormat = (data) => {
        const len = Object.prototype.toLocaleString.call(data);
        if (len >= 10) {
            let parseData = parseInt(data, 10)
            return Object.prototype.toLocaleString.call(parseInt(parseData / 10000)) + "万"
        }
    }
    showFormat2 = (data) => {
        const len = Object.prototype.toLocaleString.call(data);
        if (len >= 8) {
            let parseData = parseInt(data, 10)
            return Object.prototype.toLocaleString.call(parseInt(parseData / 10000)) + "万"
        }
    }
    getOnlineSer = () => {
        if (!this.state.modal) {
            this.setState({
                modal: true
            })
        } else {
            const el = document.querySelectorAll('.am-modal-wrap')
            const mask = document.querySelectorAll('.am-modal-mask')
            el[0].style.display = 'block'
            mask[0].style.display = 'block'
        }

        // this.props.history.push('onlineService')
        // let url='https://tgkf.csc108.com:8443/chatVisitor/pc.html?codeKey=1&companyPk=8a6dfa386dcab402016dcd3bbde40000&channelPk=8a6dfa3b71f42ead0172099970e00000&userId=0865f7b59bb048bc89e3bb5e26815af7#/'
        // window.open('https://tgkf.csc108.com:8443/chatVisitor/pc.html?codeKey=1&companyPk=8a6dfa386dcab402016dcd3bbde40000&channelPk=8a6dfa3b71f42ead0172099970e00000&userId=0865f7b59bb048bc89e3bb5e26815af7#/')

        // window.open (url, "_self", 'left=410,height=610, width=860, top=200,  toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')

        // api_services.onlineSers({userId:"0865f7b59bb048bc89e3bb5e26815af7"},res=>{
        //     console.log(res)
        //     }
        // )
    }
    render() {
        const { searchListDataSource } = this.state;
        const optionList = searchListDataSource.map(item => <option key={item.id} value={item.productNo}>{item.productName}</option>)
        const total = this.state.productCountInfo["产品总数"]
        const setUpAready = ((this.state.productCountInfo["已成立数量"] / total) * 100).toString().substring(0, 4) || "0"
        const raiseAready = ((this.state.productCountInfo["募集数量"] / total) * 100).toString().substring(0, 4) || "0"
        const OutAready = ((this.state.productCountInfo["已清盘数量"] / total) * 100).toString().substring(0, 4) || "0"
        return (
            <div className='home_container'>

                <INavBar class={`inavbar whtnavbar`} navlabel='托管外包' leftIcons={[{ icon: 'leftback', label: '', event: () => this.props.history.goBack() }]} rightIcons={[{ icon: 'today', label: '', event: () => { } }, { icon: 'calendar', label: '', event: () => this.handerMounthDisk() }]} />
                <HomeCarousel />
                <HomeServiceMenu parentProps={this.props.history} />
                <NewInfo parentsProps={this.props.history} />
                <section className='product'>
                    <div className='productAcount'>
                        产品总数: {total}
                    </div>
                    <div className='productMain'>
                        <div className='left'>
                            <div className='productItem'>
                                <div className='productText setUP'> {setUpAready}%  </div>
                                <div className='pro_item_style'> 已成立 : {this.state.productCountInfo["已成立数量"]}  </div>
                            </div>
                            <div className='productItem'>
                                <div className='productText mj'> {raiseAready}%  </div>
                                <div className='pro_item_style'> 募集 : {this.state.productCountInfo["募集数量"]}  </div>
                            </div>
                            <div className='productItem'>
                                <div className='productText liquidation'> {OutAready}%  </div>
                                <div className='pro_item_style'> 已清盘 :{this.state.productCountInfo["已清盘数量"]} </div>
                            </div>
                        </div>
                        <div className='middle'>
                            <Gauge />
                        </div>
                        <div className='right'>
                            <div className='productItem'>
                                <div className='acount_item setUP'>{this.showFormat2(this.state.productCountInfo["总份额"])} </div>
                                <div className='pro_item_style'> 总份额数   </div>
                            </div>
                            <div className='productItem'>
                                <div className='acount_item'> {this.state.productCountInfo["客户数"]} ↓ </div>
                                <div className='pro_item_style'> 客户总数 </div>
                            </div>
                            <div className='productItem'>
                                <div className='acount_item asset'> {this.showFormat(this.state.productCountInfo["总资产"])} ↓  </div>
                                <div className='pro_item_style'> 总资产 </div>
                            </div>
                        </div>
                    </div>


                </section>
                <section className='calendar'>
                    <div className='searchBox'>
                        <div className='Protitle'>产品 </div>
                        {/* <select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                        </select> */}
                        <div className='Search'>
                            <select name="" id="" className='searchBar'>
                                {optionList}
                            </select>
                        </div>
                        <div className='btn'>
                            <span className='seting'></span>
                            <span className="setText"> 设置我的日历 </span>
                            <span className='setCalendar'>  </span>

                        </div>
                    </div>
                </section>
                <section className='productList'>
                    <div className='title'>
                        <div className='titleText'>产品列表</div>
                        <div className='more'>更多&gt;</div>
                    </div>
                    <div className='proItem'>
                        <ProductList parentProps={this.props.history} dataSource={this.state.productListData} />
                    </div>

                </section>
                <div className='callServer' id="customerService"> 
                    <div className='Services'>

                    </div>
                    <div className='onLineSer' onClick={() => { this.getOnlineSer() }}>

                    </div>

                </div>

                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    closable={true}
                    //   maskClosable={false}
                    //   transparent={false}
                    animationType={'slide-down'}
                    className={'pop'}
                    onClose={this.onClose('modal')}
                    title="在线客服"
                    //   footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]} 
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                //   afterClose={() => { alert('afterClose'); }}
                >
                    <div className='service-main'>
                        <object data={`https://tgkf.csc108.com:8443/chatVisitor/mobile.html?codeKey=1&companyPk=8a6dfa386dcab402016dcd3bbde40000&channelPk=8a6dfa3b71f42ead0172099970e00000&userId=0865f7b59bb048bc89e3bb5e26815af7`} type="text/html" className='services_box' ></object>
                    </div>
                    {/* <object data={`https://tgkf.csc108.com:8443/chatVisitor/mobile.html?codeKey=1&companyPk=8a6dfa386dcab402016dcd3bbde40000&channelPk=8a6dfa3b71f42ead0172099970e00000&userId=0865f7b59bb048bc89e3bb5e26815af7`} type="text/html" className='services_box' ></object> */}
                </Modal>
            </div>
        );
    }
}

export default Home