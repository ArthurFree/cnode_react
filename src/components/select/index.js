import React, { Component } from 'react';
import propTypes from 'prop-types';
import './select.less';

export default class Select extends Component {
    static PropTyes = {
        value: propTypes.any,
        onChange: propTypes.func
    }

    state = {
        value: ''
    }

    onChangeHandler = (e) => {
        let { onChange } = this.props;
        this.setState({
            value: e.target.value
        });
        if (typeof onChange === 'function') {
            onChange(e);
        }
    }

    render() {
        let { children } = this.props;
        return (
            <div className="select-component">
                <select className="select-elem"
                    value={this.state.value}
                    onChange={this.onChangeHandler}>
                    { children }
                </select>
                <div className="select-arrow"></div>
            </div>
        )
    }
}
