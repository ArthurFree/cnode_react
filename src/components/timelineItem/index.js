import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './timelineItem.less';

export default class TimelineItem extends Component {
    static propTypes = {
        last: PropTypes.bool,
        color: PropTypes.string
    }

    state = {}

    render() {
        const { children, last, color } = this.props;
        return (
            <li className={ last ? 'timeline-item-component timeline-item-last' : 'timeline-item-component' }>
                <div className="timeline-item-line"></div>
                <div className={ color ? `timeline-item-sign timeline-item-sign-${color}` : "timeline-item-sign timeline-item-sign-blue" }></div>
                <div className="timeline-item-content">{ children }</div>
            </li>
        )
    }
}
