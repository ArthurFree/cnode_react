import React, { Children } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import Timeline from 'components/timeline';
import TimelineItem from 'components/timelineItem';

class Test_Child extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>{this.props.children} - {this.props.last.toString()}</span>
        )
    }
}

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('-- react children --', Children);
        console.log('-- react children toArray --', Children.toArray(this.props.children));
        console.log('-- react children count --', Children.count(this.props.children));
        console.log('-- react props children --', this.props.children);

        const items = Children.map(this.props.children, (item, index) =>
            React.cloneElement(item, {
                last: (React.Children.count(this.props.children) - 1) === index
            })
        );
        return (
            <div>{items}</div>
        )
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>这里是Login</div>
                <Test>
                    <Test_Child>1</Test_Child>
                    <Test_Child>2</Test_Child>
                    <Test_Child>3</Test_Child>
                    <Test_Child>4</Test_Child>
                </Test>
                <Timeline>
                    <TimelineItem color="red">
                        <div>hello</div>
                        <div>hello</div>
                        <div>hello</div>
                        <div>hello</div>
                    </TimelineItem>
                    <TimelineItem color="green">hello</TimelineItem>
                    <TimelineItem color="blue">hello</TimelineItem>
                    <TimelineItem>hello</TimelineItem>
                </Timeline>
            </div>
        )
    }
}

export default withRouter(connect(
    /* (state) => {},
    (dispath) => {} */
)(Login))
