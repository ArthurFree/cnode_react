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

    handleClick = (url) => {
        let { onClick } = this.props;

        if (onClick && typeof onClick == 'function') {
            return onClick.bind(this, url);
        }
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
            <ListItem header={headerNode} content={contentNode} onClick={this.handleClick(data.id)} />
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
        this.pageNum = 1;
    }

    componentDidMount() {
        this.getList();

        window.addEventListener('scroll', this.handleScrollThrottle, false);
    }

    componentUnmount() {
        this.pageNum = 1;

        window.removeEventListener('scroll', this.handleScrollThrottle, false);
    }

    handleScrollThrottle = () => {
        console.log('--- scroll ---');
        let func = utils.throttle(this.handleScroll, 500, {
            leading: true,
            trailing: true
        });

        func();
    }

    getList = () => {
        const { actions } = this.props;
        const { pageSize, tab } = this.state;
        actions.getList({
            page: this.pageNum,
            limit: pageSize,
            tab: tab
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
        if ((docClientHeight + docScrollTop + 200) >= docScrollHeight) {
            ++this.pageNum;
            this.getList();
        }
    }

    gotoDetail = (url) => {
        let { history } = this.props;
        this.pageNum = 1;
        window.removeEventListener('scroll', this.handleScrollThrottle, false);
        history.push(`/detail/${url}`);
    }

    render() {
        let { $$list } = this.props;
        let listData = $$list.toJS();
        return (
            <div>
                <List>
                    {
                        listData && listData.list.length !== 0 ? (
                            listData.list.map((item, index) => {
                                return (
                                    <Item key={index} data={item} onClick={this.gotoDetail} />
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
