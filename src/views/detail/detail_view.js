import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import * as Actions from 'actions/detail_action.js';
import 'assets/style/views/detail.less';

class DetailPage extends Component {
    constructor(props) {
        super(props);
        let path = props.location.pathname.split('/')[2];
        this.state = {
            id: path ? path : null
        }
    }

    componentDidMount() {
        let { actions } = this.props;
        let { id } = this.state;
        if (id) {
            actions.getDetail({
                id: this.state.id
            });
        } else {
            alert('该主题不存在！！！')
        }

    }

    render() {
        let { content } = this.props.$$detail.toJS();
        return (
            <div className="detail-wrapper">
                <div className="detail-content" dangerouslySetInnerHTML={{ __html: content.content }}></div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state) => {
        return {
            $$detail: state.$$detail
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch)
        }
    }
)(DetailPage))
