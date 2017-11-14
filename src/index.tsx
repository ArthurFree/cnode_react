// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import { Hello } from './components/Hello';

// ReactDOM.render(
//     <Hello compiler="Tpescript" framework="React"></Hello>,
//     document.getElementById("example")
// )

import createHistory from 'history/createHashHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import AppRouter from './router';
import { configureStore } from './store/index';
// import 'assets/iconfont/iconfont.css';
// import 'assets/style/index.less';

const store = configureStore();
const history = createHistory();

class Root extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <AppRouter store={store} />
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('app'));
