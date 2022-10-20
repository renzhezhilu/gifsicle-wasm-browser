<p align="left">
  <a href="./README.md">En</a> | 简体中文
</p>
<p align="center">
  <img src="./docs/icon.png" width="100">
</p>
<h1 align="center">Gifsicle Wasm Browser</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/gifsicle-wasm-browser">
    <img align="center" src="https://img.shields.io/npm/v/gifsicle-wasm-browser.svg?style=flat-square" height=17>
  </a>
  <a href="https://unpkg.com/gifsicle-wasm-browser/dist/gifsicle.min.js">
    <img align="center" src="https://img.shields.io/bundlephobia/minzip/gifsicle-wasm-browser.svg?style=flat-square"
      height=17>
  </a>
</p>
<p align="center">
  在浏览器中运行 Gifsicle，对 GIFs 进行压缩、裁剪、操作帧、调整尺寸等等操作。

</p>

<p align="center">
  <img align="center" src="./docs/images/ui.webp">
</p>

<!-- # 目录

- [功能]()
- [Demo]()
- [快速开始]()
- [Api]()
- [提示]()
- [浏览器支持]() -->
# 功能

- 完整还原 Gifsicle 1.92 的功能
- 支持多个 GIFs 的输入和输出
- 支持多条命令
- 小巧(Gzip≈150KB)
- 无依赖

# Demo
## 基础用法
更多命令请查阅[Gifsicle手册](https://www.lcdf.org/gifsicle/man.html)。
<!-- > - 裁剪发生在任何旋转、翻转、调整大小或定位之前 -->
<table>
  <tr>
    <th>压缩</th>
    <th>操作帧</th>
    <th>裁剪</th>
    <th>尺寸</th>
    <th>其他</th>
  </tr>
  <tr>
    <td>
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ROeGd1M3NnMldjdncwbUlDSy9naXBoeS5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLU8xIC0tbG9zc3k9MjAgMS5naWYgIC1vIC9vdXQvb3V0LmdpZiJ9XSwiem9vbSI6MX0=">轻量</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ROeGd1M3NnMldjdncwbUlDSy9naXBoeS5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLU8yIC0tbG9zc3k9NDAgMS5naWYgIC1vIC9vdXQvb3V0LmdpZiJ9XSwiem9vbSI6MX0=">普通</a>
      <br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ROeGd1M3NnMldjdncwbUlDSy9naXBoeS5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLU8zIC0tbG9zc3k9MTYwIDEuZ2lmICAtbyAvb3V0L291dC5naWYifV0sInpvb20iOjF9">极限</a>
      <br /><br /><br /><br /><br /><br /><br />
    </td>
    <td>
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ZHZzRkQjZqWlFZdFcvZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6IjEuZ2lmICMtMS0tMiAtbyAvb3V0L291dC5naWYifV0sInpvb20iOjF9">选中最后2帧</a><br />
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEyLmdpcGh5LmNvbS9tZWRpYS8xM0NvWERpYUNjQ295ay8yMDAuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6IjEuZ2lmICMwLTIgIy0xLS0zICAtbyAvb3V0L291dC5naWYifV0sInpvb20iOjF9">选中前3帧和后3帧</a><br />
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEyLmdpcGh5LmNvbS9tZWRpYS8xM0NvWERpYUNjQ295ay8yMDAuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6IjEuZ2lmIC0tZGVsZXRlICMwLTIwIC1vIC9vdXQvb3V0LmdpZiJ9XSwiem9vbSI6MX0=">删除前20帧</a><br />
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEyLmdpcGh5LmNvbS9tZWRpYS8xM0NvWERpYUNjQ295ay8yMDAuZ2lmIiwibmFtZSI6IjEuZ2lmIn0seyJmaWxlIjoiaHR0cHM6Ly9tZWRpYTIuZ2lwaHkuY29tL21lZGlhL05tOFpQQUdPd1pVUU0vMjAwLmdpZiIsIm5hbWUiOiIyLmdpZiJ9XSwiY29tbWFuZCI6W3sidmFsdWUiOiItYiAtLXJlc2l6ZSAyNDF4MjAwIDIuZ2lmIn0seyJ2YWx1ZSI6IiAxLmdpZiAtLXJlcGxhY2UgIzItNSAgMi5naWYgICAtbyAvb3V0L291dC5naWYifV0sInpvb20iOjF9">将3-6帧替换成其他GIF</a><br />
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhLzF5QzJnZUJtSkpiaE1XYnl5Ni9naXBoeS5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiMS5naWYgIy0xLTAgICAtbyAvb3V0L291dDEuZ2lmIn0seyJ2YWx1ZSI6Ii1VIDEuZ2lmICMtMS0wICAgLW8gL291dC9vdXQyLmdpZiJ9XSwiem9vbSI6IjAuOSJ9">倒带</a><br />
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL25qT04zakVtVFlIRWZSYmZzay8yMDAuZ2lmIiwibmFtZSI6IjIuZ2lmIn0seyJmaWxlIjoiaHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvSXAzckk4VzFZY1hITzVNeUhRL2dpcGh5LmdpZiIsIm5hbWUiOiIxLmdpZiJ9XSwiY29tbWFuZCI6W3sidmFsdWUiOiItYiAgLVUgICAtLXJlc2l6ZSAxMDB4MTAwIDEuZ2lmIn0seyJ2YWx1ZSI6Ii1iICAtVSAgLS1yZXNpemUgMTAweDEwMCAyLmdpZiAifSx7InZhbHVlIjoiLVUgIFxuMS5naWYgLS1hcHBlbmQgIzAgIDIuZ2lmICMwIFxuMS5naWYgLS1hcHBlbmQgIzEgIDIuZ2lmICMxIFxuMS5naWYgLS1hcHBlbmQgIzIgIDIuZ2lmICMyIFxuMS5naWYgICAgLS1hcHBlbmQgIzMgIDIuZ2lmICMzIFxuMS5naWYgIC0tYXBwZW5kICM0ICAyLmdpZiAjNCBcbjEuZ2lmICAtLWFwcGVuZCAjNSAgMi5naWYgIzUgXG4tbyAvb3V0L291dC5naWYifV0sInpvb20iOiIwLjkifQ==">将2个GIF交替</a><br />
      <a
        href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL2hUaDliU2JVUFdNV2svZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii1lIC1VIDEuZ2lmICAtbyAvb3V0L291dC5naWYifV0sInpvb20iOiIwLjYifQ==">导出所有帧</a><br />
        <br />
        <br />
        <br />
    </td>
     <td>
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWE0LmdpcGh5LmNvbS9tZWRpYS9uUjRMMTBYbEpjU2VRLzIwMC5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLS1jcm9wIDMwLDAtMTgwLDExMCAxLmdpZiAgLW8gL291dC9vdXQuZ2lmIn1dLCJ6b29tIjoxfQ==">根据左上角和右下角</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWE0LmdpcGh5LmNvbS9tZWRpYS9uUjRMMTBYbEpjU2VRLzIwMC5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLS1jcm9wIDMwLDArMTUweDExMCAxLmdpZiAgLW8gL291dC9vdXQuZ2lmIn1dLCJ6b29tIjoxfQ==">根据左上角和高宽</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWE0LmdpcGh5LmNvbS9tZWRpYS9uUjRMMTBYbEpjU2VRLzIwMC5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLS1yb3RhdGUtOTAgLS1jcm9wIDUwLDArMTAweDEwMCAxLmdpZiBcbi1vIC9vdXQvcm90YXRlLT5jcm9wLmdpZiJ9XSwiem9vbSI6MX0=">旋转后裁剪</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWE0LmdpcGh5LmNvbS9tZWRpYS9uUjRMMTBYbEpjU2VRLzIwMC5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLS1jcm9wIDUwLDArMTAweDEwMCAxLmdpZiBcbi1vIC9vdXQvbm90LWZsaXAuZ2lmIn0seyJ2YWx1ZSI6Ii0tZmxpcC1ob3Jpem9udGFsIC0tY3JvcCA1MCwwKzEwMHgxMDAgMS5naWYgXG4tbyAvb3V0L2ZsaXAuZ2lmIn1dLCJ6b29tIjoxfQ==">翻转后裁剪</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ZHZzRkQjZqWlFZdFcvZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii1iIC0tY3JvcC10cmFuc3BhcmVuY3kgIDEuZ2lmIn0seyJ2YWx1ZSI6Ii1iIC0tcm90YXRlLTE4MCAgIDEuZ2lmIn0seyJ2YWx1ZSI6Ii0tcm90YXRlLTE4MCAtLWNyb3AtdHJhbnNwYXJlbmN5IFxuMS5naWYgIC1vIC9vdXQvb3V0LmdpZiJ9XSwiem9vbSI6MX0=">裁剪掉多余透明</a><br />
      <br />
      <br /><br /><br />
    </td>
    <td>
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ZHZzRkQjZqWlFZdFcvZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii0tcmVzaXplIDEwMHhfXG4xLmdpZiAgLW8gL291dC9vdXQuZ2lmXG4ifV0sInpvb20iOjF9">修改宽度为100px</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ZHZzRkQjZqWlFZdFcvZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii0tc2NhbGUgMC41XG4xLmdpZiAgLW8gL291dC9vdXQuZ2lmXG4ifV0sInpvb20iOjF9">缩小50%</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0ZHZzRkQjZqWlFZdFcvZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii1TIDUwMHg1MDBcbjEuZ2lmICAtbyAvb3V0L291dDEuZ2lmXG4ifSx7InZhbHVlIjoiLVMgNTAweDUwMCAtcCAxMjAsMTIwXG4xLmdpZiAgLW8gL291dC9vdXQyLmdpZlxuIn1dLCJ6b29tIjoxfQ==">修改纵横比</a><br />
      <br /><br /><br /><br /><br /><br /><br /><br />
    </td>
    <td>
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhLzludVhSeDVFZkdzS2MvZ2lwaHkuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii0tbG9vcGNvdW50PTEgMS5naWYgIC1vIC9vdXQvbG9vcC0xLmdpZiJ9LHsidmFsdWUiOiItLWxvb3Bjb3VudD0yIDEuZ2lmICAtbyAvb3V0L2xvb3AtMi5naWYifSx7InZhbHVlIjoiLS1sb29wY291bnQ9MCAxLmdpZiAgLW8gL291dC9sb29wLWZvcmV2ZXIuZ2lmIn1dLCJ6b29tIjoiMC43In0=">循环次数</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0k1MWlnR0Nvc1pqOTB5M1Y5TC9naXBoeS5naWYiLCJuYW1lIjoiMS5naWYifV0sImNvbW1hbmQiOlt7InZhbHVlIjoiLS1pbmZvIDEuZ2lmICAtbyAvb3V0L2luZm8udHh0In1dLCJ6b29tIjoiMS41In0=">读取信息</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL0k1MWlnR0Nvc1pqOTB5M1Y5TC9naXBoeS5naWYiLCJuYW1lIjoiMS5naWYifSx7ImZpbGUiOiJodHRwczovL21lZGlhLmdpcGh5LmNvbS9tZWRpYS9uak9OM2pFbVRZSEVmUmJmc2svMjAwLmdpZiIsIm5hbWUiOiIyLmdpZiJ9LHsiZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhLzludVhSeDVFZkdzS2MvZ2lwaHkuZ2lmIiwibmFtZSI6IjMuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii0tbWVyZ2UgMS5naWYgMi5naWYgMy5naWYgIC1vIC9vdXQvaW5mby5naWYifV0sInpvb20iOiIxLjEifQ==">合并图片</a><br />
      <a href="https://renzhezhilu.github.io/gifsicle-wasm-browser/?share=eyJpbnB1dCI6W3siZmlsZSI6Imh0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL25qT04zakVtVFlIRWZSYmZzay8yMDAuZ2lmIiwibmFtZSI6IjEuZ2lmIn1dLCJjb21tYW5kIjpbeyJ2YWx1ZSI6Ii1kMTAwIDEuZ2lmIC1vIC9vdXQvMXMuZ2lmIn0seyJ2YWx1ZSI6Ii1kNTAgMS5naWYgLW8gL291dC8wLjVzLmdpZiJ9LHsidmFsdWUiOiItZDEwIDEuZ2lmIC1vIC9vdXQvMC4xcy5naWYifSx7InZhbHVlIjoiLWQzIDEuZ2lmIC1vIC9vdXQvMC4wM3MuZ2lmIn1dLCJ6b29tIjoiMC41In0=">播放速度</a><br />
      <br /><br /><br /><br />
    </td>
    <!-- <td>
      <a href="xx">xx</a><br />
      <br />
      <a href="xx">xx</a>
      <br />
      <a href="xx">xx</a>
      <br /><br /><br /><br /><br />
    </td> -->
  </tr>
</table>

## 完整示例
[gifsicleTool.js](./docs/js/gifsicleTool.js) 通过将多条命令组合起来，完成比较实用的功能。

- [修改尺寸后合并](https://codepen.io/random233/pen/WNMWqyq?editors=1001)
- [覆盖模式调整尺寸](https://codepen.io/random233/pen/PoQgrrL?editors=1001)
- [解析 Gif 信息](https://codepen.io/random233/pen/JjpVQxr?editors=1001)
- [倒放](https://codepen.io/random233/pen/zYRXVZr?editors=1011)
- [导出所有帧](https://codepen.io/random233/pen/VwQNJMr?editors=1011)
- [剪切多余透明](https://codepen.io/random233/pen/jOZRjzg?editors=1000)



# 快速开始

## npm 安装

[import in vue](https://codesandbox.io/s/crimson-lake-jbuudt?file=/src/App.vue)
```
$ npm i gifsicle-wasm-browser --save
```

```javascript
import gifsicle from "gifsicle-wasm-browser";

gifsicle.run({
  input: [{
      file: "./cat.gif",
      name: "1.gif",
  }],
  command: [`
    -e -U 
    --resize 100x_ 
    1.gif 
    -o /out/out.gif`],
})
.then(outGifFiles => {
  console.log(outGifFiles);
  // [File,File,File ...]
});
```

## cdn
[cdn demo](https://codepen.io/random233/pen/BaYEwvr) 

```html
<script type="module">
  import gifsicle from 'https://unpkg.com/gifsicle-wasm-browser/dist/gifsical.min.js'
  // or
  import gifsicle from 'https://cdn.jsdelivr.net/npm/gifsicle-wasm-browser/dist/gifsicle.min.js'
</script>
```

# Api

## gifsicle.run(input=[], command=[])

### input
  - `Array`: 输入的 Gif 文件
  - ### file
    - `String`: GIF的网络url
    - `File` 、 `Blob` 、 `ArrayBuffer`: 通过[\<input type="file"\>](https://codepen.io/random233/pen/BaYEwvr?editors=1010)获取的本地文件
  - ### name
    - `String`: 将在 `command` 中使用的文件名
### command
  - `Array`: 执行的命令
### folder
  - `Array`: (可选的) 将在 `command` 中使用的文件夹名称
### isStrict
  - `Boolean`: (可选的) `command` 发生错误或警告时立即结束
  - default:`false` 
## 返回
  GIF [File](https://developer.mozilla.org/en-US/docs/Web/API/File)数组

# 注意事项
- ### 函数使用
  - `input` 中的 `name` 可以自定义，但是不能重复。
  - `command` 的最后一条必须包含`-o /out/**.gif`,
  - 默认可用的目录有 `/` 、 `/out` 、 `/tem`，当 `command` 执行完成后会将`/out`的所有文件导出
  - `command` 将按顺序逐个执行, 需要对多个 GIFs 同时处理时请使用多个 `gifsicle.run()`。[按顺序执行](https://codepen.io/random233/pen/mdXgqwK?editors=1001) | [同时执行](https://codepen.io/random233/pen/ZErZavQ?editors=1000)
- ### 关于压缩Gif的经验
  - 谨慎使用`-O3`或`-O2`,尤其是10Mb以上大文件,耗时会成倍上涨，并且压缩效果和`-O1`几乎无差别。
  - `lossy`数值范围在 **1-200** 之间,数值越大Gif画面的噪点越明显。
  - 根据我的经验, **30-60** 是比较均衡的选择。
  
🦁️ Gif:[小狮子的耳朵](https://user-images.githubusercontent.com/7707921/188507621-49aa2691-a7d4-4b35-bb06-4ecb35b361d4.gif)

![gifsicle-wasm-browser压缩参数图示02](https://user-images.githubusercontent.com/7707921/188506723-8978412c-d4bb-49d4-867c-b876c1ade1f2.gif)


  <!-- ![gifsicle-wasm-browser压缩参数图示01](https://user-images.githubusercontent.com/7707921/188500398-59093705-c766-4b81-8c62-10a851906119.gif) -->



# 作者

gifsicle-wasm-browser 是 [@renzhezhilu](https://github.com/renzhezhilu) 在
[wasm-codecs/gifsicle](https://github.com/cyrilwanner/wasm-codecs/tree/master/packages/gifsicle) 和
[gifsicle](https://github.com/kohler/gifsicle) 基础上开发。

# To do
- [x] 单个 Gif 输入和输出
- [x] 多个 Gif 输入输出(完整版)
- [x] Npm
- [ ]
多核处理([SharedArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer))