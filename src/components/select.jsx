import React,{ Component } from "react";
import  "./style/select.less"

export default class SelectBox extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        const data=this.props.data||[];
        const handleChange=this.props.handleChange?this.props.handleChange:()=>{}
        // const optionlist=data.map(item=><option key={item.id} value={item.productNo}>{item.productName}</option>)
        const optionlist=data.map(item=><option key={item[this.props.keyType]} value={item[this.props.val]}>{item[this.props.text]}</option>)
        return(
            <section className="search">
                <span className={`title`}>{this.props.title}</span>
                <div className={`ipt-search`}>
                    <select className='seclect-box' onChange={
                        e=>handleChange(e.target.value)}
                        >
                       {this.props.define?<option value="">请选择产品...</option>:""} 
                      {optionlist}
                    </select>
                </div>
            </section>
        )
    }
}