import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { TAG } from 'constants/constants.js';
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
        let { tagText, tagColor, title, avatar, userName } = this.props;
        let headerNode = (
            <span>
                <span className="item-header"><Tag text={tagText} color={tagColor} /></span>
                <span className="item-title ellipsis">{title}</span>
            </span>
            // <span>置顶</span>
        );
        let contentNode = (
            <div className="item-content">
                <div className="item-avatar">
                    <img src={avatar ? avatar : defaultAvatar} width="100%" height="100%" alt="默认头像" />
                </div>
                <div className="item-text">
                    <div className="first-line">
                        <span style={{ width: '50%', display: 'inline-block' }}>{name}</span>
                        <span>发表于xx</span>
                    </div>
                    <div className="second-line">
                        <span style={{ width: '50%', display: 'inline-block' }}>回复数/浏览数</span>
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
    }

    state = {
        pageNum: 1,
        pageSize: 10
    }

    componentDidMount() {
        let { actions } = this.props;
        actions.getList({
            params: this.state.pageNum,
            limit: this.state.pageSize
        });
    }

    render() {
        let { $$list } = this.props;
        let listData = $$list.toJS();
        return (
            <div style={{marginTop: '1rem'}}>
                <List>
                    {
                        listData.length !== 0 ? (
                            listData.map((item, index) => {
                                return (
                                    <Item key={index}
                                        tagText={item}
                                        tagColor
                                        title
                                        avatar
                                        userName
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
