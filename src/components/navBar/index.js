import React, { Component } from 'react';
import propTypes from 'prop-types';
import './navBar.less';

export default class NavBar extends Component {
    static PropTypes = {
        leftContent: propTypes.any,
        rightContent: propTypes.any,
        onLeftClick: propTypes.func,
        onRightClick: propTypes.func,
        showLeftArrow: propTypes.bool
    }

    onClickLeftButton = () => {
        let { onLeftClick } = this.props;
        if (typeof onLeftClick === 'function') {
            onLeftClick();
        }
    }

    onClickRightButton = () => {
        let { onRightClick } = this.props;
        if (typeof onRightClick === 'function') {
            onRightClick();
        }
    }

    render() {
        let { children, leftContent, rightContent, showLeftArrow } = this.props;
        return (
            <div className="navBar-component">
                <div className="navBar-left" onClick={this.onClickLeftButton}>
                    {
                        showLeftArrow ? (
                            <i className="icon iconfont cnode-common-fanhui-copy" style={{ fontSize: '0.3rem', marginRight: '0.1rem' }}></i>
                        ) : null
                    }
                    { leftContent ? leftContent : null }
                </div>
                <div className="navBar-title">{ children }</div>
                <div className="navBar-right" onClick={this.onClickRightButton}>{ rightContent ? rightContent : null }</div>
            </div>
        )
    }
}
