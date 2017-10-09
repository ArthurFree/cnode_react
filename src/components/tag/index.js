import React from 'react';
import './tag.less';

/**
 * 属性：
 * text：tag文字
 * textColor: tag文字颜色
 * backgroundColor: 背景颜色
 * size: tag大小
 * 
 * @export
 * @class Tag
 * @extends {React.Component}
 */

export default class Tag extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            color: this.props.color ? this.props.color : '#000',
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#fff',
        }
        return (
            <span className="tag-component" 
                style={style}>
                { this.props.text }
            </span>
        )
    }
}