module.exports = {
    "rules": {
        "no-unused-vars": 0,
        "no-console": 0,
        "react/prop-types": 0,
    },
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true // enable JSX
        }
    },
    "globals": { // 定义全局的变量

    },
    "extends": [ // 推荐使用默认配置好的
        "eslint:recommended", "plugin:react/recommended"
    ],
    "plugins": [//定义第三方插件
        // "flowtype",
        "react"
    ],
    "settings": {// 设置
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "15.5.4" // React version, default to the latest React stable release
        },
        "sharedData": "sharedName"
    },
    "root": true // 设置他后，子的js文件找到该 eslint配置文件后，则不再向上查找其他eslint配置文件
}
