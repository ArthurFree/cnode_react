import configureStoreDev from './configureStore.dev';

let configureStore: any;

if (process.env.NODE_ENV === 'dev') {
    configureStore = configureStoreDev;
}

export { configureStore };
