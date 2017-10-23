import React, { Component } from 'react';
import propTypes from 'prop-types';
import './mask.less';

export default class Mask extends Component {
    static PropTypes = {
        show: propTypes.bool,
        maskClose: propTypes.bool
    }

    static defaultProps = {
        show: true,
        maskClose: true
    }

    state = {
        show: true,
    }

    componentWillReceiveProps(nextProps) {
        let prevProps = this.props;
        if (prevProps.show !== nextProps.show) {
            this.changeMaskStatus();
        }
    }

    changeMaskStatus = () => {
        let { show } = this.state;
        this.setState({
            show: !show,
        });
        console.log('--- changeMaskStatus ---')
    }

    render() {
        let { maskClose } = this.props;
        return this.state.show ? (
            <div className="mask-component" onClick={ maskClose ? this.changeMaskStatus : undefined }></div>
        ) : null
    }
}
