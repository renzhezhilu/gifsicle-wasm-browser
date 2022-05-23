<p  align="right">
    En |
    <a href="./README_CN.md">中文</a>
</p>
<p align="center">
    <img src="./demo/favicon.svg" width="70">
</p>
<h1 align="center">Gifsicle Wasm Browser</h1> 


在浏览器中使用worker和WebAssembly运行Gifsicle，
通过Gifsicle的node.js版本[wasm-codecs](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle)修改而来。

Run Gifsicle with worker and WebAssembly in browser,
Modified from the node.js version of Gifsicle [wasm-codecs](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle).

<img src="./demo/ui.jpg" >


# Demo
[Complete demo]() 

[Simple demo]()

[Gif compression](https://imagestool.com/gif-compress)

[Gif crop](https://imagestool.com/gif-crop)

[Gif upside down](https://imagestool.com/gif-reverse)


# Quick setup

```javascript
(async function(){
  
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

    let command = ['-O2', '--lossy=30','--rotate-90']
    let buffer = await fetch('./1.gif').then(file => file.arrayBuffer())
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorker.min.js'
    ).then(blob => {
        // success
        console.log(blob)
        // blob return -> Blob size: 736843 type: "image/gif"
    }).catch(e => {
        // error
        console.error(e);
    })
})()
```
## normal call
gifsicle.min.js、gifsicle.wasm and gifsicleWorker.min.js must be in the same directory
```javascript
...
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorker.min.js'
    )
...
```

## single file call
All files are packed in gifsicleWorkerAllInPack.min.js
```javascript
...
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorkerAllInPack.min.js'
    )
...
```
## cdn
```javascript
...
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorkerAllInPack.min.js'
    )
...
```
or
```javascript
...
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorkerAllInPack.min.js'
    )
...
```
# Docs
[Gifsicle manual](https://www.lcdf.org/gifsicle/man.html)

# Author
gifsicle-wasm-browser is developed by [@renzhezhilu](https://github.com/renzhezhilu) on the basis of [wasm-codecs/gifsicle](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle) and [gifsicle](https://github.com/kohler/gifsicle )


# To do
- [x] 单个Gif输入和输出
- [ ] 多个Gif输入输出(完整版)

- [x] Single Gif input and output
- [ ] Multiple Gif input and output (full version)



