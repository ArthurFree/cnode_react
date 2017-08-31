import React from 'react';

export const asyncComponent2 = loadComponent => {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state ={
                Component: null,
            }
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                })
                // .catch((err) => {
                //     console.error(`Cannot load component in <AsyncComponent />`);
                //     throw err;
                // });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
};

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