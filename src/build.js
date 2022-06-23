
// const fs = require('fs')
const fs = require('fs-extra')
const path = require('path');
const { promises } = require('stream');
const UglifyJS = require("uglify-js");
///////////////


build()
async function build() {
    let indexJs = fs.readFileSync('./index.js').toString()
    let workerStr = workerJs()
    workerStr = JSON.stringify(workerStr)
    indexJs = indexJs.replace(`workerLocalUrl: ''`, `workerLocalUrl: ${workerStr}`)
    let result = UglifyJS.minify(indexJs);
    indexJs = result.code
    progresLog(`minify code 🔧 `)


    ////////////////
    let version = fs.readFileSync('./version').toString()
    version = updateVersionNum(version)
    let package = fs.readFileSync('../package.json').toString()
    package = package.replace(/(?<=version\"\: \").*?(?=\")/ig, version)
    let serviceWorker = fs.readFileSync('../docs/js/service-worker.js').toString()
    serviceWorker = serviceWorker.replace(
        /(?<=PRECACHE \= \").*?(?=\")/ig,
        version
    )
    serviceWorker = serviceWorker.replace(
        /(?<=RUNTIME \= \").*?(?=\")/ig,
        version+'_RUNTIME'
    )
    let filesList = await creatServiceWorker()
    progresLog(`creat service-worker.js files path -> ${filesList.length} 🔧`)
    filesList = filesList.map(m=>`'${m}'`).toString()
    serviceWorker = serviceWorker.replace(
        /(?<=PRECACHE_URLS \= \[).*?(?=\];)/ig,
        filesList
    )

    // let indexHtml = fs.readFileSync('../docs/index.html').toString()
    // indexHtml = indexHtml.replace('../../src/index.js','./gifsicle.min.js')
    // let gifsicleTool = fs.readFileSync('../docs/js/gifsicleTool.js').toString()
    // gifsicleTool = gifsicleTool.replace('../../src/index.js','./gifsicle.min.js')

    fs.writeFileSync('./version', version)
    fs.writeFileSync('../package.json', package)
    fs.writeFileSync('../docs/js/service-worker.js', serviceWorker)
    progresLog(`out files 🔧 `)

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
    progresLog('done ✅')


}

function progresLog() {
    console.log(...arguments);
}

function wasmBase64() {
    let base64 = fs.readFileSync('./gifsicle.wasm').toString('base64')
    base64 = 'data:application/wasm;base64,' + base64
    progresLog(`wasm 🔧  <${base64.slice(20, 60)}>`)
    return base64
}
function workerJs() {
    let wasmJs = fs.readFileSync('./gifsicle.js').toString()
    let wJs = fs.readFileSync('./worker.js').toString()
    wJs = wJs.replace('importScripts("gifsicle.js");', wasmJs)
    let result = UglifyJS.minify(wJs);
    let out = result.code.replace('gifsicle.wasm', wasmBase64())
    progresLog('workerJs 🔧')
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
        if (verArr[i] >= 100) {
            if (verArr[i + 1] != undefined) {
                verArr[i + 1] += 1
                verArr[i] = 0
            }
        }
        newVer.push(verArr[i])
    }
    newVer = newVer.reverse().join('.')
    progresLog(`update version number ${num} -> ${newVer} 🔧`)
    return newVer
}

async function creatServiceWorker(params) {

    function pathMap(dir = '../docs/') {
        return new Promise((res, rej) => {
            let pathList = []
            let readTimeout
            try {

                let readAll = (rootDir, cd) => {
                    fs.readdirSync(rootDir, { withFileTypes: true }).forEach(function (dirent) {
                        readTimeout = setTimeout(() => {
                            res(pathList)
                        }, 1);
                        let filePath = path.join(rootDir, dirent.name);
                        if (dirent.isFile()) {
                            cd(filePath, dirent);
                        } else if (dirent.isDirectory()) {
                            readAll(filePath, cd);
                        }
                    });
                }
                readAll(dir, (filePath, stat) => {
                    clearTimeout(readTimeout)
                    pathList.push(filePath)

                });
            }
            catch (error) {
                rej(`Error!${dirent.name}`)
            }
        })
    }
    let siteDir = '../docs'
    let exclude = ['service-worker.js', '.DS_Store']
    let filesList = await pathMap(siteDir)
    filesList = filesList.filter(f => exclude.every(s => !f.includes(s)))
    filesList = filesList.map(m => m.replace(siteDir, '.'))
    return filesList

}
