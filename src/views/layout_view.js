import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import Tag from 'components/tag';
import ListItem from 'components/listItem';
import Header from 'components/header';
import Menu from 'components/menu';
import Mask from 'components/mask';
import Modal from 'components/modal';
import 'assets/style/views/layout.less';
import defaultAvatar from 'assets/imgs/default-avatar.png';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    handleClick = () => {
        let { isShow } = this.state;
        this.setState({
            isShow: !isShow
        });
    }

    render() {
        let headerNode = (
            <span>
                <span className="item-header"><Tag text="置顶" color="red" /></span>
                <span className="item-title ellipsis">前端周刊第49期前端周刊第49期前端周刊第49期前端周刊第49期</span>
            </span>
            // <span>置顶</span>
        );
        let contentNode = (
            <div className="item-content">
                <div className="item-avatar">
                    <img src={defaultAvatar} width="100%" height="100%" alt="默认头像" />
                </div>
                <div className="item-text">
                    <div className="first-line">
                        <span style={{ width: '50%', display: 'inline-block' }}>名字</span>
                        <span>发表于xx</span>
                    </div>
                    <div className="second-line">
                        <span style={{ width: '50%', display: 'inline-block' }}>回复数/浏览数</span>
                        <span>最后回复于xx</span>
                    </div>
                </div>
            </div>

        )
            // <img className="item-avatar" src={defaultAvatar} alt="默认头像" />
            // <Tag text="置顶" backgroundColor="#e74c3c" />
            // <Menu></Menu>
        return (
            <div>
                <Header onClick={this.handleClick}></Header>
                <Menu show={this.state.isShow}></Menu>
                <input type="file" accept="image/*" style={{ position: 'relative', top: 100 }} />
                <div style={{ margin: '1rem' }}></div>
                <Modal title="hello" footer={[{
                    text: 'hello',
                }, {
                    text: 'world'
                }]}>
                    hello world
                </Modal>
                <i className="icon iconfont cnode-star"></i>
                <ListItem header={headerNode} content={contentNode} />
                <ListItem header={headerNode} content={contentNode} />
                <ListItem header={headerNode} content={contentNode} />
                <ListItem header={headerNode} content={contentNode} />
                <div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(Layout))
