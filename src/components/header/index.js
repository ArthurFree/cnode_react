import React from 'react';
import propTypes from 'prop-types';
import './header.less';

export default class Header extends React.Component {
    static PropTypes = {
        onClick: propTypes.func
    }

    state = {
        move: false
    }

    handleClick = () => {
        let { move } = this.state;
        const { onClick } = this.props;
        if (typeof onClick == 'function') {
            this.props.onClick();
            this.setState({
                move: !move
            });
        }
    }

    render() {
        return (
            <div className="header-component">
                <div className="header-nav" onClick={this.handleClick}></div>
                <div className="header-title">全部</div>
                <div className="header-operate"></div>
            </div>
        )
    }
}
