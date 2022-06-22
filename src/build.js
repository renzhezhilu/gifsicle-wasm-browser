const fs = require('fs')
let UglifyJS = require("uglify-js");

build()
function build() {
    let indexJs = fs.readFileSync('./index.js').toString()
    let workerStr = workerJs()
    workerStr = JSON.stringify(workerStr)
    indexJs = indexJs.replace(`workerLocalUrl: ''`, `workerLocalUrl: ${workerStr}`)
    let result = UglifyJS.minify(indexJs);
    indexJs = result.code

    ////////////////
    let version = fs.readFileSync('./version').toString()
    version = updateVersionNum(version)
    let package = fs.readFileSync('../package.json').toString()
    package = package.replace(/(?<=version\"\: \").*?(?=\")/ig, version)
    fs.writeFileSync('./version', version)
    fs.writeFileSync('../package.json', package)
    ////////////////
    let aut = `/* 
    gifsicle-wasm-browser 
    version: v${version}
    authors: https://github.com/renzhezhilu/gifsicle-wasm-browser 
    license: MIT 
*/
`
    indexJs = aut + indexJs

    fs.writeFileSync('../dist/gifsicle.min.js', indexJs)
    fs.writeFileSync('../docs/js/gifsicle.min.js', indexJs)
    ////////////////


}


function wasmBase64() {
    let base64 = fs.readFileSync('./gifsicle.wasm').toString('base64')
    base64 = 'data:application/wasm;base64,' + base64
    // console.log(base64.slice(0, 100));
    return base64
}
function workerJs() {
    let wasmJs = fs.readFileSync('./gifsicle.js').toString()
    let wJs = fs.readFileSync('./worker.js').toString()
    wJs = wJs.replace('importScripts("gifsicle.js");', wasmJs)
    let result = UglifyJS.minify(wJs);
    let out = result.code.replace('gifsicle.wasm', wasmBase64())
    return out
    // base64 = 'data:application/wasm;base64,' + base64
    // console.log(base64.slice(0, 100));
}

function updateVersionNum(num = '0.3.3') {
    num = num.replace(/\ /ig, '').replace(/\n/ig, '')

    let verArr = num.split('.').map(m => m - 0).reverse()
    let newVer = []
    for (let i = 0; i < verArr.length; i++) {
        if (i === 0) verArr[i] += 1
        if (verArr[i] >= 10) {
            if (verArr[i + 1] != undefined) {
                verArr[i + 1] += 1
                verArr[i] = 0
            }
        }
        newVer.push(verArr[i])
    }
    newVer = newVer.reverse().join('.')
    console.log(`${num} -> ${newVer}`);
    return newVer
}
