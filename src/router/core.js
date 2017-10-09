import React from 'react';

export function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent()
                    .then(({ default: Component }) => {
                        AsyncComponent.Component = Component
                        this.setState({ Component });
                    })
                    // .catch((err) => {
                    //     console.error(`Cannot load component in <AsyncComponent />`);
                    //     // throw err;
                    // });
            }
        }

        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null;
        }
    }
}