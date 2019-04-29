module.exports = {
    "root": true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@vue/airbnb',
        "plugin:vue/recommended",
    ],
    plugins: [
        'vue',
    ],
    globals: {
        axios: true,
        route: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    },
};