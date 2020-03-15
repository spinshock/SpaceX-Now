module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        'react-app',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'require-jsdoc': 0,
    },
};
