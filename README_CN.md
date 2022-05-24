<p  align="right">
    <a href="./README.md">En</a> | 中文
</p>
<p align="center">
    <img src="./demo/favicon.svg" width="100">
</p>
<h1 align="center">Gifsicle Wasm Browser</h1> 


在浏览器中使用worker和WebAssembly运行Gifsicle，
通过Gifsicle的node.js版本[wasm-codecs](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle)修改而来。

<img src="./demo/ui.jpg" >

# Demo
[完整demo](https://renzhezhilu.github.io/gifsicle-wasm-browser/demo/) 

[简单demo](https://renzhezhilu.github.io/gifsicle-wasm-browser/demo/simple.html)

[使用cdn的简单demo(codepen)](https://codepen.io/random233/pen/xxYLeJd)

[Gif裁剪](https://imagestool.com/gif-crop)



# 快速开始
[下载代码](https://github.com/renzhezhilu/gifsicle-wasm-browser/archive/refs/heads/main.zip)

```javascript
(async function(){
    let command = ['-O2', '--lossy=30','--rotate-90']
    let buffer = await fetch('./1.gif').then(file => file.arrayBuffer())
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorker.min.js'
    ).then(blob => {
        // 成功
        console.log(blob)
        // blob 返回 -> Blob size: 736843 type: "image/gif"
    }).catch(e => {
        // 失败
        console.error(e);
    })

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

})()
```
## 普通调用
gifsicle.min.js、gifsicle.wasm 和 gifsicleWorker.min.js 必须放在同一目录
```javascript
...
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorker.min.js'
    )
...
```

## 单文件调用
所有文件打包到了 gifsicleWorkerAllInPack.min.js
```javascript
...
    gifsicleWorker({buffer,command},
        '../dist/gifsicleWorkerAllInPack.min.js'
    )
...
```
## cdn
[jsdelivr](https://www.jsdelivr.com/package/gh/renzhezhilu/gifsicle-wasm-browser?path=dist)

# 文档
[Gifsicle 手册](https://www.lcdf.org/gifsicle/man.html)

# 作者
gifsicle-wasm-browser 是 [@renzhezhilu](https://github.com/renzhezhilu) 在 [wasm-codecs/gifsicle](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle) 和 [gifsicle](https://github.com/kohler/gifsicle) 基础上开发的


# To do
- [x] 单个Gif输入和输出
- [ ] 多个Gif输入输出(完整版)




