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
        'indent':          ['warn', 4, {'SwitchCase': 1}],
        'linebreak-style': ['warn', 'unix'],
        'quotes':          ['warn',  'single'],
        'semi':            ['warn', 'always'],
        'no-unused-vars':  ['warn']
    }
};
