<p align="center">
    <img src="./demo/favicon.svg" width="70">
</p>
<p align="center">
    En
    <a href="#">中文</a>
</p>
<h1 align="center">Gifsicle Wasm Browser</h1> 


在浏览器中使用worker运行Gifsicle，
通过Gifsicle的node.js版本[wasm-codecs](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle)修改而来。

<img src="./demo/ui.jpg" >


# Demo
[完整示例]()

[简单示例]()

[Gif压缩]()

[Gif裁剪]()


# Quick setup

```javascript
let command = ['-O2','--lossy=30']
let buffer = await fetch('./1.gif').then(file => file.arrayBuffer())
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
            worker.terminate();
            res(e.data)
        };
        worker.onerror = function (e) {
            worker.terminate();
            rej(e)
        };
    })
}
gifsicleWorker({buffer,command},
    //  All files are packed in gifsicleWorkerAllInPack.min.js
    // '../dist/gifsicleWorkerAllInPack.min.js'
    // or 
    // gifsicle.min.js、gifsicle.wasm and gifsicleWorker.min.js must be in the same directory
    '../dist/gifsicleWorker.min.js'
).then(blob => {
    // success
    console.log(blob)
    // blob return -> Blob size: 736843 type: "image/gif"
}).catch(e => {
    //  error
    console.error(e);
})


```


# To do
- [x] 单个Gif输入和输出
- [ ] 多个Gif输入输出(完整版)



https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle#license

https://www.lcdf.org/gifsicle/man.html

https://github.com/kohler/gifsicle