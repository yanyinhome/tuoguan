import React,{Component} from "react";
import "./style/c-search-product.less";
import {Picker,List,InputItem} from 'antd-mobile';
import bd_utils from "../utils/bd_utils";

export default class CustomSearchProduct extends Component {
    state={
        select_value:null,
        select_item_value:null
    }
    getSelectLabel(id){
        if (this.props.data){
            for(var i = 0;i<this.props.data.length;i++){
                let item = this.props.data[i];
                if (item.value === id){
                    this.setState({
                        select_value:item.label
                    })
                    break;
                }
            }
        }
    }
    render() {
        return (
            <div className='search_select_contain_pb'>
                <div className='search_container_label_pb'>{this.props.titleLabel}</div>
                <div className='search_container_select_pb'>
                    <div className='search_select_area_pb'>
                        <div className='search_pick_area_left'>
                            <InputItem
                                placeholder={this.props.placeholder ? this.props.placeholder : '请选择'}
                                onChange={(val)=>{
                                    console.log(val)
                                this.setState({
                                    select_value:val
                                })
                            }}
                                       value={this.state.select_value !== null && this.state.select_value !== undefined ? this.state.select_value :
                                           (bd_utils.isEmpty(this.props.initValue) ? "" :
                                               (bd_utils.isEmpty(this.props.data) ? "" :
                                                   (this.props.data.length > 0 ? this.props.data[this.props.initValue].label : "")))}
                                       className='search_input_div'
                                       clear
                                       onKeyPress={(e)=>{
                                           if (e.which === 13){
                                               this.props.searchValueCallBack(this.state.select_value)
                                           }
                                       }}/>
                        </div>
                        <div className='search_pick_area_right'>
                            <Picker
                                data={this.props.data}
                                value={this.state.select_item_value}
                                cols={1}
                                onChange={(val)=>{
                                    this.getSelectLabel(val[0]);
                                    this.props.selectValueCallBack(val[0])
                                    this.setState({
                                        select_item_value:val
                                    })
                                }}
                                itemStyle={{fontSize:'13px',color:'#222222'}}
                            >
                                <List.Item/>
                            </Picker>
                        </div>
                        <div className='right_arrow_search'></div>
                    </div>
                </div>
            </div>
        )
    }
}
