import React from 'react';

export function asyncComponent1(getComponent) {
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

export function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          component: null
        };
      }

      async componentDidMount() {
        const { default: component } = await importComponent();

        this.setState({
          component: component
        });
      }

      render() {
        const C = this.state.component;

        return C ? <C {...this.props} /> : null;
      }
    }

    return AsyncComponent;
  }
