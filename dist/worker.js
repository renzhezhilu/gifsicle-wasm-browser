(function () {
    'use strict';

    importScripts('./gifsicle-wasm-browser.js');


    onmessage = function (e) {
        const main = async () => {
            let {
                buffer,
                command,
            } = e.data;
            // let buf = await fetch(url).then(file => file.arrayBuffer());
            let u8Data = new Uint8Array(buffer);
            let outputU8Data = await gifsicle({
                data: u8Data,
                command: command
            }).catch(_ => null);
            let gif = new Blob([outputU8Data.buffer], {
                type: 'image/gif',
            });
            postMessage(gif);
        };
        main().catch(e => {
            postMessage(null);
        });
    };

})();
