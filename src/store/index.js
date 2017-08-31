import configureStoreDev from './configureStore.dev';

let configureStore;

if (process.env.NODE_ENV === "dev") {
    configureStore = configureStoreDev;
}

export default configureStore;