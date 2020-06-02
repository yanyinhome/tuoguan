import React, {Component} from 'react'





class FlowSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        // const Step = Steps.Step;
        return ( 
            <div className='flowSteps'> 
            <div className='startFlow'> 
                <div className="statusText">准入</div>
                <div className="statusText">合同签署</div>
                <div className="statusText">募集</div>
                <div className="statusText">成立</div>
                <div className="statusText">备案</div>
            </div>
            <div className='step'>
                <div className='step-container'>
                    <ul className='topUl'>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                       
                    </ul>
                    <ul className='bottomUl'>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    
                    </ul>
                </div>
               
                <div className='roundBorder'>

                </div>
                
            </div>
            <div className='endFlow'> 
                <div className="statusText">清盘</div>
                <div className="statusText">产品运营</div>
                <div className="statusText">三方挂接</div>
                <div className="statusText">股东卡开立</div>
                {/* <div className="statusText">备案</div> */}
            </div>
             
            </div>
         );
    }
}


export default FlowSteps;