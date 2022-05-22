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

# Quick setup

```javascript
let command = ['-O2','--lossy=30']
let buffer = await fetch('./1.gif').then(file => file.arrayBuffer())
/*
    gifsicle.js、gifsicle.wasm and gifsicleWorker.js in the same directory
*/ 
let gifsicleWorker = new Worker('../dist/gifsicleWorker.js');
/*
    All files are packed in gifsicleWorkerAllInPack.js
    let gifsicleWorker = new Worker('../dist/gifsicleWorkerAllInPack.js');
*/ 
gifsicleWorker.postMessage({
    buffer: buffer,
    command: command
});
gifsicleWorker.onmessage = function (e) {
    //  error
    if (!e.data) {
        return
    }
    // success
    console.log(e.data)
    // e.data return -> Blob size: 736843 type: "image/gif"
};
//  error
gifsicleWorker.onerror = function (e) {
    console.error(e);
    gifsicleWorker.terminate();
};
```

# Demo
[完整示例]()

[简单示例]()

[Gif压缩]()

[Gif裁剪]()

# To do
[ ] 多文件输入输出



https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle#license

https://www.lcdf.org/gifsicle/man.html

https://github.com/kohler/gifsicle