import React from 'react';
import './list.less';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-component">
                { this.props.children }
            </div>
        )
    }
}