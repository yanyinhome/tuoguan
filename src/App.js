import React, {Component} from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './css/App.less';
/* 引入页面 */
import Home from './view/home/home.jsx';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'home',
            hidden: false,
        };
    }
    render() {
        return (
            <div className='apps' style={{
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0,
                backgroundColor: 'white',
                overflow:'auto'
            }}>
               <Home history={this.props.history}></Home>
            </div>
        );
    };
}
