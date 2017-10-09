import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import configureStore from './store';

const store = configureStore();
const history = createHistory();

class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <AppRouter store={store} />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById("app"));