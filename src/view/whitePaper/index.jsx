import React, {Component} from 'react'
import INavBar from "../../components/i-navbar";
import CustomSearchProduct from "../../components/c-search-product";

export default class WhitePape extends Component{
    render(){
        return (
            <div className='home_container whitePaper'>
            <INavBar class={`inavbar whtnavbar`} navlabel="白皮书" leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
            <div className="content">
                <CustomSearchProduct />
            </div>
            </div>
        )
    }
}