import React, { Component } from 'react';
import propTypes from 'prop-types';
import Mask from 'components/mask';
import './modal.less';

export default class Modal extends Component {
    static PropTypes = {
        visible: propTypes.bool,
        maskClose: propTypes.bool,
        onClose: propTypes.func,
        title: propTypes.string,
        footer: propTypes.array,
    }

    renderFooterBtn = (button, i) => {
        const onClickFn = function (e) {
            e.preventDefault();
            if (button.onPress) {
                button.onPress();
            }
        }

        return (
            <a className="modal-button" key={i} onClick={onClickFn}>{ button.text || `Button` }</a>
        )
    }

    render() {
        let { children, title, footer } = this.props;
        const btnGroupClass = footer.length == 2 ? 'h' : 'v'
        const footerDom = footer.length ? (
            <div className={`modal-button-group-${btnGroupClass}`}>
                { footer.map((button, index) => this.renderFooterBtn(button, index)) }
            </div>
        ) : null;

        return (
            <div className="modal-component">
                <Mask></Mask>
                <div className="modal-wrap">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title">{ title }</div>
                            </div>
                            <div className="modal-body">{ children }</div>
                            <div className="modal-footer">
                                {
                                    footerDom
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
