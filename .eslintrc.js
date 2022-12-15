module.exports = {
    'env': {
        'browser': true,
        'es2022': true,
        'webextensions': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        ecmaVersion: 13,
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    'rules': {
        'indent':          ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes':          ['warn',  'single'],
        'semi':            ['error', 'always'],
        'no-unused-vars':  ['warn']
    }
};
