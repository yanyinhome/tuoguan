import React,{ Component } from "react";
import CustomSearchProduct from "./c-search-product";
import  "./style/select.less"

export default class SelectBox extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        const data=this.props.data||[];
        const productList=data.map(item=>{return {label:item[this.props.text],value:item[this.props.val]}})
        return(
            <section className="search">
                <div className={`ipt-search`}>
                    <CustomSearchProduct 
                    {...this.props}
                    data={productList}
                    titleLabel={this.props.title}
                    />
                </div>
            </section>
        )
    }
}