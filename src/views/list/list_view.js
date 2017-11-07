import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { TAG, TAG_COLOR } from 'constants/constants.js';
import utils from 'utils';
import List from 'components/list';
import ListItem from 'components/listItem';
import Tag from 'components/tag';
import * as Actions from 'actions/list_action.js';
import 'assets/style/views/list.less';
import defaultAvatar from 'assets/imgs/default-avatar.png';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    getItem() {
        let { data } = this.props;
        let headerNode = (
            <span>
                <span className="item-header">
                    <Tag text={data.top ? TAG['top'] : data.good ? TAG['good'] : TAG[String(data.tab)]}
                        color={data.top ? TAG_COLOR['top'] : data.good ? TAG_COLOR['good'] : TAG_COLOR[String(data.tab)]} />
                </span>
                <span className="item-title ellipsis">{data.title}</span>
            </span>
            // <span>置顶</span>
        );
        let contentNode = (
            <div className="item-content">
                <div className="item-avatar">
                    <img src={data.author.avatar_url ? data.author.avatar_url : defaultAvatar}
                        width="100%" height="100%" alt="默认头像" />
                </div>
                <div className="item-text">
                    <div className="first-line">
                        <span style={{ width: '50%', display: 'inline-block', fontWeight: 'bold' }}>
                            {data.author.loginname ? data.author.loginname : ''}
                        </span>
                        <span>发表于xx</span>
                    </div>
                    <div className="second-line">
                        <span style={{ width: '50%', display: 'inline-block' }}>{data.reply_count}/{data.visit_count}</span>
                        <span>最后回复于xx</span>
                    </div>
                </div>
            </div>
        )

        return (
            <ListItem header={headerNode} content={contentNode}></ListItem>
        )
    }

    render() {
        return this.getItem();
    }
}

class ListPage extends Component {
    constructor(props) {
        super(props);
        let tab = props.match.params.tab
        this.state = {
            pageNum: 1,
            pageSize: 20,
            tab: tab == 'all' || !tab ? null : tab,
        }
        this.startY = 0;
        this.direction = '';
    }

    componentDidMount() {
        this.getList();

        window.addEventListener('scroll', utils.throttle(this.handleScroll, 200, {
            leading: true,
            trailing: true
        }), false);

        // window.addEventListener('touchstart',  this.handleTouchStart, false);

        // window.addEventListener('touchmove', utils.throttle(this.handleTouch, 200, {
        //     leading: true,
        //     trailing: true
        // }), false);

        // window.addEventListener('scroll', function () {
        //     console.log('--- load ---');
        // }, false);
    }

    getList = () => {
        let { actions } = this.props;
        actions.getList({
            page: this.state.pageNum,
            limit: this.state.pageSize,
            tab: this.state.tab
        });
    }

    handleTouchStart = (e) => {
        this.startY = e.touches[0].pageY;
    }

    handleTouch = (e) => {
        let curY = e.touches[0].pageY;
        let moveY = curY - this.startY;
        if (moveY > 0) {
            this.direction = 'down';
        } else {
            this.direction = 'up';
        }
    }

    handleScroll = (e) => {
        let doc = document.documentElement;
        let docScrollHeight = doc.scrollHeight;
        let docScrollTop = doc.scrollTop ? doc.scrollTop : window.pageYOffset;
        let docClientHeight = doc.clientHeight;
        // alert(docScrollHeight+ ',' + docScrollTop + ',' + docClientHeight)
        console.log('--- docScrollHeight docScrollTop docClientHeight ---', docScrollHeight, docScrollTop, docClientHeight);
        if ((docClientHeight + docScrollTop + 200) >= docScrollHeight) {
            let { pageSize } = this.state;
            this.setState({
                pageSize: pageSize + 20
            }, () => {
                this.getList();
            });
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     let tab = nextProps.match.params.tab;
    //     let { actions } = this.props;
    //     let prevProps = this.props;
    //     tab = tab ? tab : null;
    //     console.log(tab, this.state.tab);
    //     if (tab !== this.state.tab) {
    //         this.setState({
    //             tab: tab == 'all' || !tab ? null : tab,
    //         }, () => {
    //             let { pageNum, pageSize, tab } = this.state;
    //             actions.getList({
    //                 params: pageNum,
    //                 limit: pageSize,
    //                 tab: tab
    //             });
    //         });
    //     }
    // }

    render() {
        let { $$list } = this.props;
        let listData = $$list.toJS();
        return (
            <div style={{marginTop: '.8rem'}}>
                <List>
                    {
                        listData && listData.list.length !== 0 ? (
                            listData.list.map((item, index) => {
                                return (
                                    <Item key={index}
                                        data={item}
                                    ></Item>
                                )
                            })
                        ) : null
                    }
                </List>
            </div>
        )
    }
}

export default withRouter(connect(
    (state) => {
        return {
            $$list: state.$$list
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch)
        }
    }
)(ListPage))
