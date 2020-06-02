// import React, { Component } from 'react';
// import {InputItem, Tabs} from 'antd-mobile';
// import '../../css/search.less';

// /* 引入最新研报 */
// import ReportsList from '../recommend/essence/latest/latest-research-report';
// /* 引入活动 */
// import {ActivityMoudleList} from '../research/activity/all-activities';
// /* 引入分析师 */

// /* 搜索 */
// export default class Search extends Component{

//     state = {
//         stateType:"history"
//     }
//     inputOnChange(val){
//         if (val.trim() === ""){
//             this.setState({
//                 stateType:"history"
//             })
//         }else{
//             /* 请求数据 */
//             this.setState({
//                 stateType:"result"
//             })
//         }
//     }
//     returnDiv(val){
//         if (val === "history"){
//             return <SearchHistoryList data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}/>;
//         }else if(val === "result"){
//             return <SearchResult/>;
//         }
//     }
//     render(){
//         return(
//             <section className='searchContainer'>
//                 <div className='topDiv'>
//                     <div className='inputDiv'>
//                         <div className='searchImage'>
//                             <div className='searchButton'></div>
//                         </div>
//                         <InputItem clear={true} className='searchInput' onChange={(val)=>{this.inputOnChange(val)}} placeholder='搜索、研报、分析师'/>
//                     </div>
//                     <div className='cancelButton' onClick={()=>{this.props.history.goBack()}}>
//                         <div className='textDiv'>取消</div>
//                     </div>
//                 </div>
//                 {this.returnDiv(this.state.stateType)}
//             </section>
//         );
//     }
// }

// /* 历史搜索列表 */
// function SearchHistoryList(props) {
//     var items = [];
//     if (props.data && props.data.length > 0){
//         for (var i = 0; i<props.data.length;i++){
//             var item = <div key={i} className='historyListItem'>
//                 <div className='icon'>
//                     <div className='iconImage'></div>
//                 </div>
//                 <div className='content'>历史item {i}</div>
//                 <div className='delButton'>
//                     <div className='iconImage'></div>
//                 </div></div>;
//             items.push(item);
//         }
//     }
//         return(
//             <div className='historyContainer'>
//                 <div className='top'>
//                     <div className='left'>历史搜索</div>
//                     <div className='right'>清空</div>
//                 </div>
//                 <div className='historyShowArea'>
//                     {items.length > 0 ? items : <div className='resultIsNone'>暂无数据</div>}
//                 </div>
//             </div>
//         );


// }

// /* 搜索结果展示 */
// function SearchResult(props) {
//     const tabs = [
//         { title: '全部', sub: '1',listData:[]},
//         { title: '研报', sub: '2',listData:[]},
//         { title: '分析师', sub: '3',listData:[]},
//         { title: '活动', sub: '4',listData:[]}
//     ];

//     /* tab点击回调 */
//     const tabOnclick = function (tab, index) {
//         console.log(tab + " ----" +index);
//     }

//     /* 更多点击 */
//     const moreClick = function (type) {
//         console.log(type);
//     }

//     return(
//         <div className='searchResultContainer'>
//         <Tabs style={{height:'90px'}} swipeable={false} animated={false} tabs={tabs} initialPage={0} onTabClick={tabOnclick}>
//             <div className='showArea'>
//                 <div className='search_module_item'>
//                     <div className='title'>
//                         <div className='name'>研报</div>
//                         <div className='right'><div onClick={moreClick}>更多></div></div>
//                     </div>
//                 </div>
//                 <ReportsList/>
//                 <div className='search_split_line'></div>
//                 <div className='search_module_item'>
//                     <div className='title'>
//                         <div className='name'>分析师</div>
//                     </div>
//                 </div>
//                 <AnalystModuleList/>
//                 <div className='search_split_line'></div>
//                 <div className='search_module_item'>
//                     <div className='title'>
//                         <div className='name'>活动</div>
//                         <div className='right'><div onClick={moreClick}>更多></div></div>
//                     </div>
//                 </div>
//                 <ActivityMoudleList data={[]}/>
//             </div>
//             <div className='showArea'>
//                 <SearchResultIsNone/>
//             </div>
//             <div className='showArea'>
//                 <SearchResultIsNone/>
//             </div>
//             <div className='showArea'>
//                 <SearchResultIsNone/>
//             </div>
//         </Tabs>
//         </div>
//     );
// }


// /* 分析师 */
// class AnalystModuleList extends Component{
//     getItems(){
//         if (this.props.data){
//             var items = [];
//             for (var i = 0;i<this.props.data.length;i++){
//                 let item = <div className='analyst_item'>
//                     <div className='head'>
//                         <div className='headImage'></div>
//                     </div>
//                     <div className='content'>
//                         <div className='name'>周鑫</div>
//                         <div className='tag'>
//                             <div className='tag_item'>首席</div>
//                             <div className='tag_item'>房地产</div>
//                         </div>
//                     </div>
//                     <div className='right'>
//                         <div className='guanzButton'>+ 关注</div>
//                     </div>
//                 </div>;
//                 items.push(item);
//             }
//             return items;
//         }else{
//             return <div className='resultIsNone'>暂无数据</div>;
//         }

//     }
//     render(){
//         return(<div className='search_analyst_list_container'>
//             {this.getItems()}
//         </div>);
//     }
// }

// /* 页面结果为空时显示 */
// function SearchResultIsNone(props) {
//     return(<div className='searchResultIsNoneContainer'>
//         <div className='images'></div>
//         <div className='des'>未搜到相关内容</div>
//     </div>);
// }