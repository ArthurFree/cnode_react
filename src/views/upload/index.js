import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import Uploader from 'components/uploader';

class Upload extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = {
            onBeforeQueued: function () {},
            onQueued: function () {},
        }
        return (
            <div>
                <Uploader options={options} />
            </div>
        )
    }
}

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(Upload))
