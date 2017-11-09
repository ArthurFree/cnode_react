import React from 'react';
import './listItem.less';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        let { onClick } = this.props;
        if (onClick && typeof onClick == 'function') {
            onClick();
        }
    }

    render() {
        return (
            <div className="listItem-component" onClick={this.handleClick}>
                <div className="listItem-container">
                    <div className="listItem-header">{ this.props.header }</div>
                    <div className="listItem-content">{ this.props.content }</div>
                </div>
            </div>
        )
    }
}
