import React from 'react';

import './menu.less';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-component">
                <div className="menu-cover"></div>
                <div className="menu-nav"></div>
            </div>
        )
    }
}