import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class LayoutPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(LayoutPage));
