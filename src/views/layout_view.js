import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { MENU } from 'constants/constants.js';
import Tag from 'components/tag';
import ListItem from 'components/listItem';
import Header from 'components/header';
import Menu from 'components/menu';
import Mask from 'components/mask';
import Modal from 'components/modal';
import NavBar from 'components/navBar';
import Select from 'components/select';
import 'assets/style/views/layout.less';


class Layout extends React.Component {
    constructor(props) {
        super(props);
        let title = '';

        this.getHeaderTitle = (location) => {
            let currPath = location.pathname.split('/');
            if (currPath[2]) {
                if (currPath[1] == 'detail') {
                    return MENU['detail']
                }

                return MENU[currPath[2]];
            }

            return MENU['all']
        }

        title = this.getHeaderTitle(props.location);
        this.state = {
            isShow: false,
            isScroll: true,
            headerTitle: title,
        }
    }

    componentWillReceiveProps(nextProps) {
        let prevProps = this.props;
        if (!Immutable.fromJS(prevProps).equals(Immutable.fromJS(nextProps))) {
            if (prevProps.location.pathname !== nextProps.location.pathname) {
                let path = nextProps.location.pathname.split('/')[2];
                this.setState({
                    headerTitle: this.getHeaderTitle(nextProps.location),
                });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('touchmove', this.handleTouchControl, false);
    }

    // 菜单控制
    handleClick = () => {
        let { isShow } = this.state;
        this.scrollControl();
        this.setState({
            isShow: !isShow,
        });
    }

    handleTouchControl = (e) => {
        e.preventDefault();
    }

    // 控制滚动
    scrollControl = () => {
        let { isScroll } = this.state;
        let overflow = isScroll ? 'hidden' : 'visible';

        document.documentElement.style.overflow = overflow;
        if (isScroll) {
            window.addEventListener('touchmove', this.handleTouchControl, false);
        } else {
            window.removeEventListener('touchmove', this.handleTouchControl, false);
        }

        this.setState({
            isScroll: !isScroll
        });
    }

    // 跳转
    gotoUrl = (path) => {
        let self = this;
        return function () {
            let { history } = self.props;
            self.scrollControl();
            history.replace(`/list/${path}`);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Header onClick={this.handleClick} title={this.state.headerTitle}></Header>
                    <Menu show={this.state.isShow} maskClick={this.handleClick}>
                        <div className="nav-list">
                            <ul>
                                <li onClick={this.gotoUrl('all')}>
                                    <i className="icon iconfont cnode-star" style={{color: 'yellow'}}></i>
                                    <span className="menu-text" onClick={this.handleClickLink}>全部</span>
                                </li>
                                <li onClick={this.gotoUrl('good')}>
                                    <i className="icon iconfont cnode-star" style={{color: '#e67e22'}}></i>
                                    <span className="menu-text">精华</span>
                                </li>
                                <li onClick={this.gotoUrl('share')}>
                                    <i className="icon iconfont cnode-star" style={{color: '#1abc9c'}}></i>
                                    <span className="menu-text">分享</span>
                                </li>
                                <li onClick={this.gotoUrl('ask')}>
                                    <i className="icon iconfont cnode-star" style={{color: '#3498db'}}></i>
                                    <span className="menu-text">问答</span>
                                </li>
                                <li onClick={this.gotoUrl('job')}>
                                    <i className="icon iconfont cnode-star" style={{color: '#9b59b6'}}></i>
                                    <span className="menu-text">招聘</span>
                                </li>
                            </ul>
                        </div>
                    </Menu>
                </div>
                <div style={{ marginTop: '.8rem' }}>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

/*

<input type="file" accept="image/*" style={{ position: 'relative', top: 100 }} />
<div style={{ margin: '1rem' }}></div>
<NavBar showLeftArrow={true}
    leftContent='back' rightContent='生成合同'
    onLeftClick={this.testClick} onRightClick={this.testClick}>
    Hello
</NavBar>
<Select onChange={this.testClick1}>
    <option value="hello">hello</option>
    <option value="world">world</option>
</Select>
<i className="icon iconfont cnode-star"></i>
<ListItem header={headerNode} content={contentNode} />
<ListItem header={headerNode} content={contentNode} />
<ListItem header={headerNode} content={contentNode} />
<ListItem header={headerNode} content={contentNode} />

<img className="item-avatar" src={defaultAvatar} alt="默认头像" />
<Tag text="置顶" backgroundColor="#e74c3c" />
<Menu></Menu>
<Modal title="hello" footer={[{
    text: 'hello',
}, {
    text: 'world'
}]}>
    hello world
</Modal>


*/

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(Layout))
