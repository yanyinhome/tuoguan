import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import CustomSearchProduct from "../../components/c-search-product";
import api_services from '../../services/whitePaper_api'
import './index.less'

export default class WhitePape extends Component{
    constructor(props){
        super(props)
        this.state={
            productList:[],
            selectedProductNo:""
        }
    }
    componentDidMount(){
        api_services.getProductList(this.initSerach,this.show,{})
    }
    show=(data)=>{
        console.log(data)
    }
    initSerach=(data)=>{
        const{list}=data;
        const searchData=list.map(item=>{return {label:item.productName,value:item.productNo}})
        this.setState({productList:searchData})
    }
    getSelectProductNo=(selectedProductNo)=>{
        this.setState({selectedProductNo})
    }
    render(){
        return (
            <div className='home_container whitePaper'>
            <INavBar class={`inavbar whtnavbar`} navlabel="白皮书" leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
            <div className="content">
                <CustomSearchProduct 
                data={this.state.productList}
                selectValueCallBack={this.getSelectProductNo}
                />
            </div>
            </div>
        )
    }
}