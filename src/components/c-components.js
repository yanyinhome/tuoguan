/*研报通用组件*/
import React, {Component} from "react";

import '../css/c-components.less'
import {List, SwipeAction, Text, Tabs} from "antd-mobile";
import Tip from "./tip";
import bd_utils from "../utils/bd_utils";
import DefaultImage from "./DefaultImage";

/*
 * 研报列表 图文 通用
 * history 用作路由跳转的函数 | disabled 列表左滑出是否可用{true,false} | data 列表数据后台json | swpText 操作名称中文[删除，取消收藏..]
 * 事件：gopath 路由跳转并传入参数{id} | options 操作事件[删除，取消收藏...]并传入参数{id}
 * params 路由传入参数设置 传入对象{}
 * 数据格式： {id:'',title: '',author: '',date: '',label: [],img: '',isFollow:0|1,isLike:0|1}
 */
class ResReportsCommon extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    render() {
        return (
            <section className="ResReportsCommon">
                <List>
                    {this.props.data ? this.props.data.map((item, index) => {
                        return (
                            <SwipeAction disabled={this.props.disabled} autoClose key={index}
                                         right={[{
                                             text: this.props.swpText,
                                             onPress: () => Tip.info(this.props.swpText),
                                             style: {backgroundColor: '#F4333C', color: 'white'}
                                         }]}>
                                <List.Item onClick={() =>
                                    bd_utils.searchJump(this.props.history, '/res-report-detail', {id: 13981})
                                }>
                                    <section className={`items`}>
                                        <section className={`infos`}>
                                            <h2 className={`fontcomm`}>{item.title}</h2>
                                            <p>{item.date}</p>
                                            <section className={`tagItem`}>
                                                {item.label ? item.label.map((tag, i) => {
                                                    return <Text className="tag"
                                                                 key={i}>{tag}</Text>
                                                }) : ''}
                                            </section>
                                        </section>
                                        <section className={`imgs`}>
                                            <img src={item.img} alt=""/>
                                        </section>
                                    </section>
                                </List.Item>
                            </SwipeAction>
                        )
                    }) : ''}
                </List>
            </section>
        );
    }
}

/* ====带左边tabs
 * 分析师 | 销售 | 研报分类 通用
 * tabsData 左边分类tabs
 * data 后台数据json | history 用作路由跳转的函数 | type 标签class[author] | items 标签class自定义 | align li标签的flex垂直显示方式 默认top | isFollow 是否显示关注按钮[0,1]
 * 组件事件：clazzFun 点击左边tabs并传入参数{id} | goPath 路由跳转并传入参数{id} | followFun 点击关注或取消关注并传入参数{id}
 * params 路由传入参数设置 传入对象{}
 * 自定义class需到c-components.less中设置
 * 不需要tabs直接引用组件Author
 * 不需要电话号码 data中 tel字段为''即可
 * 数据格式：{id:'',name: '',tel: '',head: '',label: [],isFollow: 0|1}
 */
class AnalystCommon extends Component {
    render() {
        return (
            <section className={`Analyst TabsVerticalCommon ` + this.props.className}>
                <Tabs tabs={this.props.tabsData ? this.props.tabsData : ''} tabBarPosition="left" renderTabBar={props => <Tabs.DefaultTabBar {...props} page={this.props.page} />}
                      tabDirection="vertical" onChange={this.props.clazzFun}>
                    <AuthorCommon data={this.props.data}
                                  history={this.props.history}
                                  type={this.props.type}
                                  items={this.props.items}
                                  align={this.props.align}
                                  isFollow={this.props.isFollow}
                                  clazzFun={this.props.clazzFun}
                                  goPath={(param) => this.props.goPath(param)}
                                  params={this.props.params}
                                  followFun={this.props.followFun}
                    />
                </Tabs>
            </section>
        );
    }
}

/* ====不带左边tabs
 * 作者 | 销售 | 分析师 通用
 */
class AuthorCommon extends Component {
    getParams(params, item) {
        for (let key in params) {
            params[key] = item[key];
        }
        return params;
    }

    render() {
        return (
            <section className={`Analyst ` + this.props.type}>
                <section className={`Analyst_Items ` + this.props.items}>
                    <ul>
                        {this.props.data ? this.props.data.map((item, index) => {
                            return (
                                <li key={index} className={`items ` + this.props.align}>
                                    <section className={`info`} onClick={() => {
                                        if (this.props.goPath) {
                                            this.props.goPath(this.getParams(this.props.params, item));
                                        }
                                    }}>
                                        <img className={`head`} src={item.head} alt=""/>
                                        <section className={`infoc`}>
                                            <p className={`name`}>{item.name}</p>
                                            {item.tel !== '' ? <p className={`tel`}>{item.tel}</p> : ''}
                                            <section className={`tagItem`}>
                                                {item.label && item.label.length !== 0 ? item.label.map((tag, i) => {
                                                    return <Text className="tag" key={i}>{tag}</Text>
                                                }) : ''}
                                            </section>
                                        </section>
                                    </section>
                                    {this.props.isFollow === 1 ?
                                        <section className={`isFollow`}>
                                            {item.isFollow === 1 ? <span className={`follow true`} onClick={() => {
                                                this.props.followFun(item, index)
                                            }}>已关注</span> : <span className={`follow false`} onClick={() => {
                                                this.props.followFun(item, index)
                                            }}>＋ 关注</span>}
                                        </section> : ''}
                                </li>
                            )
                        }) : ''}
                    </ul>
                </section>
            </section>
        );
    }
}

/*
 * 特色产品 通用
 * tabsData 顶部产品分类 | data 列表数据后台json | disabled 列表左滑出是否可用{true,false} | swpText 操作名称中文[删除，取消收藏..]
 * 事件：gopath 路由跳转并传入参数{id} | options 操作事件[删除，取消收藏...]并传入参数{id}
 * params 路由传入参数设置 传入对象{}
 * 数据格式：{id:'',title: '',author:'',date: '',label: [],head: '',isFollow:0|1,isLike:0|1}
 */
class QuickReviewCommon extends Component {
    render() {
        return (
            <section className={`QuickReview`}>
                <List>
                    {this.props.data ? this.props.data.map((item, index) => {
                        return (
                            <SwipeAction autoClose key={index} disabled={this.props.disabled} right={[
                                {
                                    text: this.props.swpText,
                                    onPress: () => Tip.info(this.props.swpText),
                                    style: {backgroundColor: '#F4333C', color: 'white'}
                                }]}>
                                <List.Item onClick={e => console.log(e)}>
                                    <section className={`items`}>
                                        <section className={`imgs`}>
                                            <img src={item.head} alt=""/>
                                        </section>
                                        <section className={`infos`}>
                                            <h2 className={`fontcomm`}>
                                                {item.author}
                                                {item.label.map((tag, i) => {
                                                    return <span key={i} className={'tag'}>{tag}</span>
                                                })}
                                            </h2>
                                            <p>{item.date}</p>
                                            <h3 className={`fontcomm title`}>{item.title}</h3>
                                        </section>
                                    </section>
                                </List.Item>
                            </SwipeAction>
                        )
                    }) : ''}
                </List>
            </section>
        )
    }
}

/*
 * 特色产品 通用
 * tabsData 顶部产品分类 | data 列表数据后台json | disabled 列表左滑出是否可用{true,false} | swpText 操作名称中文[删除，取消收藏..]
 * 事件：gopath 路由跳转并传入参数{id} | options 操作事件[删除，取消收藏...]并传入参数{id}
 * params 路由传入参数设置 传入对象{}
 * 数据格式：{id:'',title:'',summary:'',date:'',isFollow:0|1,isLike:0|1},
 */
class FeatProductsCommon extends Component {
    render() {
        return (
            <section className={`FeatProductsComm`}>
                <Tabs tabs={this.props.tabsData ? this.props.tabsData : ''} swipeable={false}
                      renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4}/>}>
                    <section className={`proConn`}>
                        {this.props.data ? this.props.data.map((item, index) => {
                            return (
                                <section key={index} className={`items_list`}>
                                    <SwipeAction autoClose disabled={this.props.disabled} key={index} right={[{
                                        text: this.props.swpText,
                                        onPress: () => Tip.info(this.props.swpText),
                                        style: {backgroundColor: '#F4333C', color: 'white'}
                                    }]}>
                                        <section className={`list`}>
                                            <section className={`pro_item`}>
                                                <h2>{item.title}</h2>
                                                <p>{item.date}</p>
                                                <h3>{item.summary}</h3>
                                            </section>
                                        </section>
                                    </SwipeAction>
                                </section>
                            )
                        }) : ''}
                    </section>
                </Tabs>
            </section>
        )
    }
}

/*
 * 研报分类列表-我的关注 通用
 * 研报分类列表-一级二级分类 通用
 */
class ResReportClazzFollowCommon extends Component {

    render() {
        return (
            <section className='ResReportClazzFollowCommon'>
                <section className='res-header'>
                    <span>一级分类</span><span>二级分类</span><span></span>
                </section>
                <section className='res-conn'>
                    <ul>
                        {
                            this.props.data.map((item, index) => {
                                return (<React.StrictMode key={index}>
                                    {item.sub.map((o, i) => {
                                            return (
                                                <li key={i}><span>{item.title}</span><span>{o.title}</span>
                                                    {o.isFollow ?
                                                        <span className={`follow true`}
                                                              onClick={()=>{this.props.followFun(index, i, item.type, o.type, o.isFollow)}}>已关注</span> :
                                                        <span className={`follow false`}
                                                              onClick={()=>{this.props.followFun(index, i, item.type, o.type, o.isFollow)}}>关注</span>
                                                    }
                                                </li>
                                            )
                                        }
                                    )}
                                </React.StrictMode>)
                            })
                        }
                    </ul>
                </section>
            </section>
        );
    }
}

/**/
class ResReportClazzListCommon extends Component {
    render() {
        return (
            <section className='ResReportClazzListCommon'>
                <section className='resp-list-conn'>
                    <section>
                        <h2>一级分类</h2>
                        <ul>
                            <li><span>{this.props.data.title ? this.props.data.title : ''}</span>
                                {this.props.data.isFollow ?
                                    <span className={`follow true`} onClick={() => {
                                        this.props.followOfOneFun(this.props.index, this.props.data.isFollow, this.props.data.type)
                                    }}>已关注</span> :
                                    <span className={`follow false`} onClick={() => {
                                        this.props.followOfOneFun(this.props.index, this.props.data.isFollow, this.props.data.type)
                                    }}>＋ 关注</span>
                                }
                            </li>
                        </ul>
                        <h2>二级分类</h2>
                        <ul>
                            {this.props.data.sub ? this.props.data.sub.map((item, index) => {
                                return (
                                    <React.StrictMode key={index}>

                                        <li key={index}><span>{item.title}</span>
                                            {item.isFollow ?
                                                <span className={`follow true`} onClick={() => {
                                                    this.props.followOfTwoFun(this.props.index, index, item.isFollow, this.props.data.type, item.type, item.title)
                                                }}>已关注</span> :
                                                <span className={`follow false`} onClick={() => {
                                                    this.props.followOfTwoFun(this.props.index, index, item.isFollow, this.props.data.type, item.type, item.title)
                                                }}>＋关注</span>
                                            }
                                        </li>

                                    </React.StrictMode>
                                )
                            }) : ''}
                        </ul>
                    </section>
                </section>
            </section>
        );
    }
}

/*
 * 活动 通用
 */
class ActivityCommon extends Component {

    renderContent(item) {
        if (item === 0) return <em className='isstart gray'>已结束</em>
        else if (item === 1) return <em className='isstart red'>未开始</em>
        else if (item === 2) return <em className='isstart blue'>进行中</em>
    }

    render() {
        return (
            <section className={`Activity`}>
                {this.props.data ? this.props.data.map((item, index) => {
                    return (
                        <section key={index} className={`items_list`}>
                            <SwipeAction autoClose disabled={this.props.disabled} key={index} right={[
                                {
                                    text: '删除',
                                    onPress: () => Tip.info('删除'),
                                    style: {backgroundColor: '#F4333C', color: 'white'}
                                },
                            ]}>
                                <section className={`list`}>
                                    <section className={`act_item`}>
                                        <DefaultImage className="listItemImg" src={item.cover}/>
                                        {this.renderContent(item.isStart)}
                                        <h2>{item.title}</h2>
                                        <p>{item.date}</p>
                                        <p>{item.isOnLine}</p>
                                    </section>
                                </section>
                            </SwipeAction>
                        </section>
                    )
                }) : ''}
            </section>
        )
    }
}

/*
 * 卡片 - 热门活动、速评、金牌分析师 通用
 */

class CardCommon extends Component {

    render() {
        return (
            <section className="Card">
                卡片
            </section>
        );
    }
}


/*导出组件*/
export {
    ResReportsCommon,
    AnalystCommon,
    AuthorCommon,
    QuickReviewCommon,
    FeatProductsCommon,
    ResReportClazzFollowCommon,
    ResReportClazzListCommon,
    ActivityCommon,
    CardCommon
};
