// rollup.config.js
export default [{
        input: './src/index.js',
        // amd – 异步模块定义，用于像RequireJS这样的模块加载器
        // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
        // esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
        // iife – 一个自动执行的功能，适合作为<script>标签。
        // umd – 通用模块定义，以amd，cjs 和 iife 为一体
        // system - SystemJS 加载器格式
        output: {
            file: './dist/gifsicle-wasm-browser.js',
            format: 'iife',
            name: 'gifsicle'
        }
    },
    {
        input: './src/worker.js',
        // amd – 异步模块定义，用于像RequireJS这样的模块加载器
        // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
        // esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
        // iife – 一个自动执行的功能，适合作为<script>标签。
        // umd – 通用模块定义，以amd，cjs 和 iife 为一体
        // system - SystemJS 加载器格式
        output: {
            file: './dist/worker.js',
            format: 'iife',
            name: 'gifsicleWorker'
        }
    }
]