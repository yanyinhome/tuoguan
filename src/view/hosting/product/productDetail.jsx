
import React, {Component} from 'react'
import INavBar from "../../../components/i-navbar";
// import '../../../css/hosting/productDetail.less';
import '../../../css/hosting/productDetail.less'
import {Tabs,List ,Card,Steps,Icon} from 'antd-mobile';
import Searchbar from '../../../components/Search-bar'
import FlowSteps from '../../../components/FlowStep'
const Item = List.Item;
const Brief = Item.Brief;
class InfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 

        return ( 
            <div className='Infolist'>
                <List>
                    <Item extra={'20200421'}>备案编号</Item>
                    <Item extra={'20200421'}>备案编号</Item>
                    <Item extra={'20200421'}>备案编号</Item>
                    <Item extra={'20200421'}>备案编号</Item>
                </List>
            </div>
         );
    }
}
class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div  className='accountInfo'> 
                 <Card>
                    <Card.Header
                        // title="募集户:13683489570"
                        title={<div><span className='account-type'>募集户 : </span><span className='account'>13683489570</span></div>}
                        extra={<span className='startAct'>启用</span>}
                    />
                    <Card.Body>
                        <List>
                            <Item  extra={'于小彤'}>账户名称</Item>
                            <Item extra={'中信银行西三环支行'}>开户银行</Item>
                            <Item extra={'6225880133098385'}>银行账户</Item>
                           
                        </List>
                    </Card.Body>
                    {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                </Card>
                 <Card>
                    <Card.Header
                        // title="募集户:13683489570"
                        title={<div><span className='account-type'>募集户 : </span><span className='account'>13683489570</span></div>}
                        extra={<span className='startAct'>启用</span>}
                    />
                    <Card.Body>
                        <List>
                            <Item  extra={'于小彤'}>账户名称</Item>
                            <Item extra={'中信银行西三环支行'}>开户银行</Item>
                            <Item extra={'6225880133098385'}>银行账户</Item>
                           
                        </List>
                    </Card.Body>
                    {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                </Card>
               
          
            </div>
         );
    }
}
 
class EmailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='emailInfo'>
                 <Card>
                    <Card.Header
                        // title="募集户:13683489570"
                        title={<span className='account-type'>估值接收邮箱 </span>}
                        extra={<span className='startAct'></span>}
                    />
                    <Card.Body>
                        <List>
                            <Item >yuxiaotong-csc108@com</Item>
                            <Item >liyiran-csc108@com</Item>
                            <Item >zhaotianqi-csc108@com</Item>
                           
                        </List>
                    </Card.Body>
                  
                </Card>
                 <Card>
                    <Card.Header
                    
                        title={<span className='account-type'>估值接收邮箱 </span>}
                        extra={<span className='startAct'></span>}
                    />
                    <Card.Body>
                        <List>
                            <Item >yuxiaotong-csc108@com</Item>
                            <Item >liyiran-csc108@com</Item>
                            <Item >zhaotianqi-csc108@com</Item>
                        </List>
                    </Card.Body>
                </Card>
                
            </div>
         );
    }
}
 

 


class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onChange(){}
    onTabClick(){}
    render() { 
        const tabs = [
            { title: <span>基本信息</span> ,value:''},
            { title: <span>账户信息</span> ,value:3},
            { title: <span>邮箱信息</span>,value:4 },
            { title: <span>流程信息</span>,value:5 },
          ];
        return ( 
            <div> 
              <INavBar class={`inavbar whtnavbar`} navlabel='产品详情' leftIcons={[{icon:'leftback',label:'',event:()=>this.props.history.goBack()}]} rightIcons={[{icon:'today',label:'',event:()=>{}},{icon:'calendar',label:'',event:()=>this.handerMounthDisk()}]} />
              <section className='proTabs'>
                    <Searchbar/>
                    <Tabs tabs={tabs}
                            initialPage={this.state.initialPage}
                        
                            onChange={(tab, index) => { this.onChange(tab,index) }}
                            onTabClick={(tab, index) => { this.onTabClick(tab,index) }}
                            >
                            {/* 基本信息 */}
                                <div className='allRemark'>                      
                                    <InfoList/>
                                </div>
                                    {/* 账户信息 */}
                                <div  className='allRemark'>
                                   <AccountInfo/>
                                </div>
                                {/*  邮箱信息 */}
                                <div className='allRemark' >
                                  <EmailInfo/>
                                  
                                </div>
                                {/*  流程信息 */}
                                <div className='allRemark'>
                                  <FlowSteps/>
                                </div>
                    </Tabs>
               </section>
            </div>
         );
    }
}
 
export default ProductDetail;