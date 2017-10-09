import React from 'react';

import './header.less';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-component">
                <div className="header-nav"></div>
                <div className="header-title">全部</div>
                <div className="header-operate"></div>
            </div>
        )
    }
}