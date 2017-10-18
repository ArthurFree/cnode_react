import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import './timeline.less';

export default class TimeLine extends Component {
    static propTypes = {}
    state = {}

    render() {
        const { children } = this.props;
        const falsylessItems = Children.toArray(children).filter(item => !!item);
        const items = Children.map(falsylessItems, (item, index) =>
            React.cloneElement(item, {
                last: index === Children.count(falsylessItems) - 1
            })
        )
        return (
            <ul className="timeline-component">
                {items}
            </ul>
        )
    }
}
