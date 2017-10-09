import React from 'react';
import './listItem.less';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="listItem-component">
                <div className="listItem-container">
                    <div className="listItem-header">{ this.props.header }</div>
                    <div className="listItem-content">{ this.props.content }</div>
                </div>
            </div>
        )
    }
}