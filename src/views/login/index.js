import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>这里是Login</div>
            </div>
        )
    }
}

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(Login))