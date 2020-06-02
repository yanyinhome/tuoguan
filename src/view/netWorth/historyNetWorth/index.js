import React, {Component} from 'react';
import INavBar from "../../../components/i-navbar";
import api_services from '../../../services/netWorth_api'
import '../netWorth.less'

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
                <div className={`lists history_list`}>
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

class historyNetWorth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param:{},
            productNetworthList:[
            ]
        }
    };
    componentDidMount(){
        const {param}=this.props.history.location.query;
        api_services.networthList(this.initProductSearch,null,{...param})
    }
    initProductSearch=(data)=>{
        this.setState({productNetworthList:data.list})
    }
    render() {
        return (
            <section className={`home_container`}>
                <INavBar class={`inavbar whtnavbar`} navlabel='净值查询' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}}]} />
                <NetWorthCover
                productNetworthList={this.state.productNetworthList}
                />
            </section>
        )
    }
}
export default historyNetWorth;