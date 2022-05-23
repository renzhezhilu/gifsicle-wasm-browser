let gifUrl = './1.gif'
let save = {
    url: null,
}
let throttle = {
    val: null,
    run(fn, ms = 600) {
        clearTimeout(this.val);
        this.val = setTimeout(() => {
            fn();
        }, ms);
    },
}

pageEvent()
start(gifUrl, getCommand())

async function start(url, command) {
    document.querySelector('.printConsole').innerHTML = `<h2 class="red" >🔥 Running...</h2>`
    document.querySelector('body').classList.add('working')
    throttle.run(async () => {
        let time = new Date()
        save.url = url
        /////////////////////////
        console.log(url);
        let file = await fetch(url).then(file => file.arrayBuffer()).then(buf => {
            return {
                blob: new Blob([buf]),
                buf: buf
            }
        })
        gifsicleWorker({
            buffer: file.buf,
            command: command
        },
            // or 
            // '../dist/gifsicleWorkerAllInPack.min.js'
            '../dist/gifsicleWorker.min.js'
        ).then(gif => {
            printConsole({
                file,
                gif,
                command,
                bufferUrl: URL.createObjectURL(file.blob),
                afterUrl: URL.createObjectURL(gif),
                time: ((new Date() - time) / 1000).toFixed(1),
            })
        }).catch(e => {
            document.querySelector('.printConsole').innerHTML = `<h2 class="red">Error!</h2>`
            document.querySelector('body').classList.remove('working')
        })
        /////////////////////////

    }, 300);

}

function gifsicleWorker(post = {}, workerUrl = '') {
    return new Promise((res, rej) => {
        let worker = new Worker(workerUrl);
        worker.postMessage(post);
        worker.onmessage = function (e) {
            if (!e.data) {
                worker.terminate();
                rej(e)
                return
            }
            console.log(e.data);
            worker.terminate();
            res(e.data)
        };
        worker.onerror = function (e) {
            worker.terminate();
            rej(e)
        };
    })
}

function history(text) {
    document.querySelector('.history').innerHTML += text
}

function pageEvent() {
    let body = document.querySelector('body')
    let input = document.querySelector('#file')
    ////////////////////
    body.addEventListener('drop', function (e) {
        e.preventDefault();
        body.style.border = "13px dashed transparent"
        // console.log();
        let commandArr = document.querySelector('.command').value.split(' ').filter(f => Boolean(f))
        let url = URL.createObjectURL(e.dataTransfer.files[0])
        start(url, commandArr)
    })
    body.addEventListener('dragover', function (e) {
        e.preventDefault();
        body.style.border = "13px dashed var(--color0)"
    })

    /////////////////////
    input.addEventListener('change', function (e) {
        console.log(e, this.files[0]);
        let commandArr = document.querySelector('.command').value.split(' ').filter(f => Boolean(f))
        let url = URL.createObjectURL(this.files[0])
        start(url, commandArr)
    });
    ////////////////////////
    document.querySelectorAll('.textGif').forEach(e => {
        e.addEventListener("click", _ => {
            start(e.innerText, getCommand())
        });
    })
    ////////////////////////
    document.querySelectorAll('.minButtonRun').forEach(e => {
        e.addEventListener("click", _ => {
            let c = e.nextSibling.nextSibling.innerText
            c = c.split(' ').filter(f => Boolean(f))
            start(save.url ? save.url : gifUrl, c)

        });
    })
    document.querySelector('.mainRun').addEventListener("click", e => {
        let commandArr = document.querySelector('.command').value.split(' ').filter(f => Boolean(f))
        console.log(commandArr);
        start(save.url ? save.url : gifUrl, commandArr)
    });


}

function getCommand() {
    let command = document.querySelector('.command')
    let commandArr = command.value.split(' ').filter(f => Boolean(f))
    console.log(commandArr);
    return commandArr
}

async function printConsole(obj = {}) {
    let {
        file,
        gif,
        bufferUrl,
        afterUrl,
        time,
        command,
    } = obj


    let beforeSize = await getInfo(file.blob)
    let afterSize = await getInfo(gif)

    history(`<span>${beforeSize} -> ${afterSize}  ${time}s  [${command.map(m => `'${m}'`).join(' ')}] </span><br />`)

    document.querySelector('body').classList.remove('working')
    document.querySelector('.printConsole').innerHTML = `
            <h3 class="green">🎉 Done! time: ${time} s</h3>
            <br/>
            <div class="imgBox">
                <div>
                    <p>Before 
                        <h2>${beforeSize}</h2></p>
                    <p>
                        <img src="${bufferUrl}" />
                    </p>
                </div>
                <h2 style="padding:10px;">👉</h2>
                <div>
                    <p>After 
                        <h2>${afterSize}</h2></p>
                        
                    <p>
                        <img src="${afterUrl}" />
                    </p>
                </div>
            </div>
        `
}
function getSize(size) {
    return (size / 1000 / 1000).toFixed(3) + ' Mb'
}
async function getInfo(file) {
    let { width, height } = await getImageWidthHeight(file)
    let size = getSize(file.size)
    return `${size} ${width}x${height}`
}
// 获取图片尺寸，也可检测浏览器是否支持读取此格式文件
function getImageWidthHeight(file) {
    return new Promise((resolve, reject) => {
        let _img = new Image();
        _img.src = window.URL.createObjectURL(file);
        _img.onload = function () {
            resolve({
                width: this.width,
                height: this.height,
                // image: _img
            })
            URL.revokeObjectURL(_img.src)
        }
        _img.onerror = function () {
            resolve(null)
        }
    })
}
