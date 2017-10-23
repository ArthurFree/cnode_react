import React from 'react';

import './menu.less';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let prevProps = this.props;
        if (prevProps.show !== nextProps.show) {
            let { show } = this.state;
            this.setState({
                show: !show
            });
        }
    }

    handleClick = () => {
        let { show } = this.state;
        this.setState({
            show: !show
        });
    }

    render() {
        const { show } = this.state;
        return show ? (
            <div className="menu-component">
                <div className='menu-cover show-nav'></div>
                <div className='menu-nav show-nav'></div>
            </div>
        ) : null;
    }
}
