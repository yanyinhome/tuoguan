import React, {Component} from 'react';
import {HashRouter as Router} from "react-router-dom";
import CacheRoute, {CacheSwitch} from 'react-router-cache-route';
// import reportPdf from "./view/research/report/report-pdf";

/* 引入app页面 */
import App from './App';

import ProductDetail from './view/hosting/product/productDetail';
import OnlineService from './view/onlineCustomerService/onlineService';
import NetWorth from './view/netWorth/netWorth'
import HistoryNetWorth from './view/netWorth/historyNetWorth/index'
import Hosting from './view/hosting/hosting'
import CustomerShareDetail from './view/hosting/CustomerShareDetail/index'
import Turnover from './view/turnover/index'
import Taxation from './view/taxation/index'
import OpenDay from './view/openDay/index'
import ProductInfo from './view/productInfo/index'
import WhitePaper from './view/whitePaper/index'
import ConfirmationSummary from './view/confirmationSummary/index'
import SummaryTurnover from './view/confirmationSummary/summaryTurnover/index'
import Notice from './view/notice/index'
import NoticeDetail from './view/notice/noticeDetail/index'
import ConfirmationSummaryDetail from './view/confirmationSummary/confirmationSummaryDetail/index'



// /* hosting  */
// import Hosting from './view/hosting/hosting';

export default class AppRouter extends Component{
    render(){
        return(
            <Router forceRefresh={false}>
                <CacheSwitch>
                    <CacheRoute exact path="/" component={App}/>
                    <CacheRoute exact path="/netWorth" component={NetWorth}/>
                    <CacheRoute exact path="/historyNetWorth" component={HistoryNetWorth}/>
                    <CacheRoute path="/productDetail" component={ProductDetail}/>
                    <CacheRoute path="/onlineService" component={OnlineService}/> 
                    <CacheRoute path="/hosting" component={Hosting}/> 
                    <CacheRoute path="/turnover" component={Turnover}/> 
                    <CacheRoute path="/taxation" component={Taxation}/> 
                    <CacheRoute path="/customerShareDetail" component={CustomerShareDetail}/> 
                    <CacheRoute path="/openDay" component={OpenDay}/> 
                    <CacheRoute path="/productInfo" component={ProductInfo}/> 
                    <CacheRoute path="/whitePaper" component={WhitePaper}/> 
                    <CacheRoute path="/confirmationSummary" component={ConfirmationSummary}/>
                    <CacheRoute path="/summaryTurnover" component={SummaryTurnover}/>
                    <CacheRoute path="/confirmationSummaryDetail" component={ConfirmationSummaryDetail}/>
                    <CacheRoute path="/notice" component={Notice}/>
                    <CacheRoute path="/noticeDetail" component={NoticeDetail}/>
                </CacheSwitch>

            </Router>
        )
    }
}
