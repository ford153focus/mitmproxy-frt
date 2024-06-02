import sqlite3InitModule from '/node_modules/@sqlite.org/sqlite-wasm/index.mjs';

(async () => {
    try {
        console.info('Loading and initializing SQLite3 module...');
        const sqlite3 = await sqlite3InitModule({
            print: console.info,
            printErr: console.error,
        });

        window.sqlite3_database = new sqlite3.oo1.JsStorageDb('local', 'c');
        console.info('Running SQLite3 version', sqlite3.version.libVersion);
    } catch (err) {
        console.error('Initialization error:', err.name, err.message);
    }
})();

class Example {
    /**
     * to use this library - add to rules.js next code
     */
    inject() {
        window._frt.Injectors.injectInternalScript({
            src: '/web_accessible_resources/_all_urls/js/libraries/sqlite.js',
            async: true,
            type: 'module',
        });
    }

    /**
     * example of table creation
     */
    create_table() {
        window.sqlite3_result = window.sqlite3_database.exec(`CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY,
            is_clicked BOOLEAN DEFAULT 0,
            is_opened BOOLEAN DEFAULT 0
        );`);
    }

    /**
     * example of inserting (upserting) values to table
     */
    insert() {
        window.sqlite3_result = window.sqlite3_database.exec({
            sql: 'INSERT INTO news(id,is_clicked) values (?,?) ON CONFLICT(id) DO UPDATE SET is_clicked=true',
            bind: ['123', true]
        });
    }

    /**
     * Example of 1-row query
     * @param {Number} item_id
     * @returns {object[]}
     */
    select_one(item_id) {
        return window.sqlite3_database.selectArray('SELECT id FROM news WHERE id=?', [item_id]);
    }

    /**
     * Example of all-rows query
     * @returns {Number[]}
     */
    select_all() {
        let all = window.sqlite3_database.selectArrays('SELECT id FROM news');
        let IDs = all.map(x => x.pop());
        return IDs;
    }
}
