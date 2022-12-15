/*eslint camelcase: 0*/
/*eslint no-console: 0*/
/*eslint-env node*/

const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

let manifest = {
    'author': 'ford153focus',
    'background': {
        'service_worker': 'background/script/background.js',
    },
    'content_scripts': [],
    'description': 'Make the web better',
    'icons': {
        '16': 'icons/bund16.jpg',
        '48': 'icons/bund48.jpg',
        '128': 'icons/bund128.jpg'
    },
    'manifest_version': 3,
    'name': 'Monkey 15',
    'permissions': [
        'notifications'
    ],
    'web_accessible_resources': [
        {
            'resources': [
                'web_accessible_resources/*',
                'lib/*'
            ],
            'matches': [
                '<all_urls>'
            ]
        }
    ]
};

let content_scripts_dir = path.join(__dirname, '/content_scripts/');

for (let item of fs.readdirSync(content_scripts_dir)) {
    let contentScriptManifestPath = path.join(__dirname, '/content_scripts/' + item + '/manifest.json');
    let contentScriptManifestPath5 = path.join(__dirname, '/content_scripts/' + item + '/manifest.json5');

    if (fs.existsSync(contentScriptManifestPath) === true) {
        let contentScriptManifest = JSON.parse(fs.readFileSync(contentScriptManifestPath, 'utf8'));

        if (contentScriptManifest.content_scripts) {
            manifest.content_scripts = manifest.content_scripts.concat(contentScriptManifest.content_scripts);
        }
    }

    if (fs.existsSync(contentScriptManifestPath5) === true) {
        let contentScriptManifest = fs.readFileSync(contentScriptManifestPath5, 'utf8');
        contentScriptManifest = JSON5.parse(contentScriptManifest);

        if (contentScriptManifest.content_scripts) {
            manifest.content_scripts = manifest.content_scripts.concat(contentScriptManifest.content_scripts);
        }
    }
}

function generateForFirefox() {
    console.log('Generating manifest for Firefox');

    manifest.applications = {
        'gecko': {
            'id': 'monkey15@ford-rt.com',
            'strict_min_version': '60.0'
        }
    };

    let d = new Date();
    manifest.version = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}rc${d.getHours()}`;

    const webExt = require('web-ext');
    webExt.util.logger.consoleStream.makeVerbose();
    webExt.cmd.build({
        artifactsDir: './web-ext-artifacts',
        ignoreFiles: [],
        overwriteDest: true,
        sourceDir: '.'
    }, {}).then(() => {
        return console.log('built by webExt');
    });
}

function generateForChrome() {
    console.log('Generating manifest for Google Chrome');

    let d = new Date();
    manifest.version = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}.${d.getHours()}`;
}

/* eslint-disable indent */
switch (process.argv[2]) {
    case '--firefox':
        generateForFirefox();
        break;
    case '--chrome':
        generateForChrome();
        break;
    default:
        console.log('No valid browser specified');
}
/* eslint-enable indent */

fs.writeFileSync('manifest.json', JSON.stringify(manifest));
