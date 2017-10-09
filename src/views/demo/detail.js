import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

class DemoDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Demo detail</div>
            </div>
        )
    }
}

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(DemoDetail))