import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import upload from './upload.js'
import './uploader.less';

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this._id = 0;
        this.options = props.options;
        this.state = {
            imgItemList: [],
            currImg: null,
            isShowGallery: false,
            currImgIndex: null,
        }
    }

    componentDidMount() {
        this.init();
    }

    // 上传文件
    setUploadFile = (file) => {
        const URL = window.URL || window.webkitURL || window.mozURL;
        // const { options } = this.props;
        const opts = Object.assign({}, {
            url: '',
            auto: true,
            type: 'file',
            fileVal: 'file',
            xhrFields: {},
        }, this.options);

        file.url = URL.createObjectURL(file);
        file.status = 'ready';
        file.upload = function () {
            // upload(Object.assign({}, {
            //     file: file,
            // }, opts));
        }

        this.options.onQueued(file);
        // if (options.auto) file.upload();
    }

    // 展示图片
    showGallery = (img, index) => {
        const self = this;
        return function () {
            self.setState({
                currImg: img,
                currImgIndex: index,
                isShowGallery: true,
            });
        }
    }

    // 添加 上传图片 缩略图
    addImgItemList = (img) => {
        let { imgItemList } = this.state;
        let key = imgItemList.length;
        imgItemList.push(
            <li className="uploader_file" key={key}
                onClick={this.showGallery(img, key)}
                style={{ backgroundImage: 'url("'+img+'")' }}></li>
        );

        this.setState({
            imgItemList,
        });
    }

    // 文件添加前
    onBeforeQueued = () => {
        // const { options } = this.props;
        console.log('--- onBeforeQueued ---', this.options)
        if (this.options.onBeforeQueued) {
            const onBeforeQueued = this.options.onBeforeQueued;
            this.options.onBeforeQueued = function (file, files) {
                const ret = onBeforeQueued.call(file, files);
                if (ret === false) return false;
                if (ret === true) return;
            }
        }
    }

    // 文件添加成功
    onQueued = () => {
        if (this.options.onQueued) {
            const onQueued = this.options.onQueued;
            const self = this;
            this.options.onQueued = function (file) {
                let img = file.base64 || file.url;
                self.addImgItemList(img);
            }
        }
    }

    // 初始化
    init = () => {
        this.onBeforeQueued();
        this.onQueued();
    }

    // input change
    handleChange = (event) => {
        let files = event.target.files;
        // let { options } = this.props;
        if (files.length === 0) {
            return;
        }

        console.log('--- files ---', files);

        // 以源文件的方式上传
        Array.prototype.forEach.call(files, (file) => {
            file.id = ++this._id;

            this.setUploadFile(file);
        });
    }

    // 隐藏图片展示
    handleClickCacel = () => {
        this.setState({
            isShowGallery: false,
        });
    }

    // 删除图片
    handleDelete = () => {
        console.log('--- index img ---', this.state.currImgIndex);
    }

    render() {
        return (
            <div>
                <ul className="uploader_files">{this.state.imgItemList}</ul>
                <div className="uploader_input_box">
                    <input onChange={this.handleChange}
                        className="uploader_input"
                        type="file" accept="image/*" capture="camera" multiple />
                </div>
                {
                    this.state.isShowGallery ? (
                        <div className="gallery"
                            onClick={this.handleClickCacel}>
                            <span className="gallery_img" style={{ backgroundImage: 'url('+this.state.currImg+')' }}></span>
                            <div className="gallery_opr" onClick={this.handleDelete}>
                                <i className="icon iconfont cnode-star"></i>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}


