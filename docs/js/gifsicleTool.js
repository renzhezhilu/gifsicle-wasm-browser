// import gifsicle from './gifsicle.min.js'
import gifsicle from '../../src/index.js'
export default {

    // 倒反
    reverse(input = '../docs/1.gif') {
        return new Promise((res, rej) => {
            gifsicle.run({
                input: [{
                    file: input,
                    name: '1.gif'
                }],
                command: [
                    '-b 1.gif',
                    '-U 1.gif #-1-0 -o /out/out.gif',
                ],
            }).then(d => {
                res(d[0])
            })
        })
    },
    // 导出所有帧
    exportFrame(input = '../docs/1.gif') {
        return new Promise((res, rej) => {
            gifsicle.run({
                input: [{
                    file: input,
                    name: '1.gif'
                }],
                command: [' 1.gif -o /out/out.gif']
            }).then(g1 => {
                gifsicle.run({
                    input: [{
                        file: g1[0],
                        name: '2.gif'
                    }],
                    command: ['--explode -U 2.gif -o /out/out.gif']
                }).then(g2 => {
                    res(g2[0])
                })
            })
        })
    },
    // 剪切多余透明
    cropTransparent(input = '../docs/t2.gif') {
        return new Promise((res, rej) => {
            gifsicle.run({
                input: [{
                    file: input,
                    name: '1.gif'
                }],
                command: [
                    '--crop-transparency  --batch  1.gif',
                    '--rotate-180  --batch  1.gif',
                    '--rotate-180 --crop-transparency 1.gif -o /out/out.gif'
                ],
            }).then(d => {
                res(d[0])
            })
        })
    },
    mergeGif(input = [], w = 100, h = 100) {
        return new Promise(async (res, rej) => {
            let out = []
            let resize = input.map(m => this.resizeCover(m, w, h))
            Promise.all(resize).then(d => {
                console.log(d);
                let input = d.map((m, index) => {
                    return {
                        file: m,
                        name: `${index}.gif`
                    }
                })
                let command = _ => {
                    let str = ''
                    input.map(m => str += ` ${m.name}`)
                    return [
                        `--merge  ${str} -o /out/out.gif`,
                    ]
                }
                console.log(command());
                gifsicle.run({ input, command: command() }).then(async d => {
                    console.log(d[0]);
                    open(URL.createObjectURL(d[0]))

                })
            })
        })

    },
    resizeCover(input = '../docs/1.gif', outWidth = 200, outHeight = 500) {
        return new Promise(async (res, rej) => {
            // 计算尺寸变换
            function computeWidthHeight(inWidth, inHeight, outWidth, outHeight, scale = 1) {
                let w, h
                if (outWidth && outHeight) {
                    w = outWidth
                    h = outHeight
                } else if (outWidth) {
                    w = outWidth
                    h = w / inWidth * inHeight
                } else if (outHeight) {
                    h = outHeight
                    w = h / inHeight * inWidth
                } else {
                    w = inWidth * scale
                    h = inHeight * scale
                }
                w = (w - 0).toFixed(0)
                h = (h - 0).toFixed(0)
                return {
                    w,
                    h
                }
            }

            let info = await this.getInfo(input)
            console.log(info);
            let { width, height } = info
            let scale =
                outWidth / width > outHeight / height
                    ? outWidth / width
                    : outHeight / height;

            let outSize = computeWidthHeight(width, height, null, null, scale);
            let pos = {
                x: 0,
                y: 0,
            };
            if (outSize.h > outHeight) {
                pos.y = (outSize.h - outHeight) / 2;
                pos.y = pos.y.toFixed(0);
            }
            if (outSize.w > outWidth) {
                pos.x = (outSize.w - outWidth) / 2;
                pos.x = pos.x.toFixed(0);
            }

            gifsicle.run({
                input: [{
                    file: input,
                    name: '1.gif'
                }],
                command: [
                    `-b --resize ${outSize.w}x${outSize.h} --use-colormap=1.gif 1.gif`,
                    `--colors 256 --crop ${pos.x},${pos.y}+${outWidth}x${outHeight} --use-colormap=1.gif  1.gif  -o /out/out.gif`,
                    // `-b --resize _x${height} 1.gif`,
                    // `--logical-screen 100x100 1.gif -o /out/out.gif`,
                ],
            }).then(async d => {
                // let file = d[0]
                // open(URL.createObjectURL(file))
                res(d[0])
            })
        })
    },

    getInfo(input = '../docs/t1_2.gif') {
        return new Promise((res, rej) => {
            function exportKeyRex(text, before, after, mode = 1, range = 'ig') {
                let rex
                if (mode === 1) {
                    rex = new RegExp(`${before}.*?${after}`, range)
                } else if (mode === 2) {
                    rex = new RegExp(`${before}.*?(?=${after})`, range)
                } else if (mode === 3) {
                    rex = new RegExp(`(?<=${before}).*?(?=${after}).*?`, range)
                }
                return text.match(rex)
            }
            function loop(text) {
                let count = exportKeyRex(text, 'loop ', '\n', 3)
                if (count && count[0]) {
                    if (count[0].includes('forever')) return 0
                    return count[0].replace(/[^0-9]/ig, '') - 1 + 2
                } else {
                    return 1
                }
            }
            function size(text) {
                let st = exportKeyRex(text, 'logical screen ', '\n', 3)
                st = st[0].split('x')
                return {
                    width: st[0] - 0,
                    height: st[1] - 0,
                }
            }
            function frames(text) {
                let arr = text.split(' + image').filter(d => d.includes('#'))
                arr = arr.map(f => {
                    let palettet = exportKeyRex(f, 'local color table \\[', '\\]\n', 3)
                    if (palettet && palettet[0]) palettet = palettet[0] - 0
                    return {
                        index: exportKeyRex(f, '#', ' ', 3) - 0,
                        transparent: exportKeyRex(f, 'transparent ', '\n', 3)?.[0] - 0,
                        disposal: exportKeyRex(f, 'disposal ', ' ', 3)?.[0],
                        delay: exportKeyRex(f, 'delay ', 's', 3)?.[0] - 0,
                        palettet,
                    }
                })
                return arr
            }
            function time(frames) {
                let t =0
                frames.map(m=>{
                    t+=m.delay
                })

                return t.toFixed(1)
            }
            let inputFile=null
            gifsicle.run({
                input: [{
                    file: input,
                    name: '1.gif'
                }],
                command: [
                    '--info 1.gif -o /out/out.txt',
                ],
                start(files){
                    inputFile=new Blob([files[0].file],{type:'image/gif'})
                }
            }).then(async d => {
                let file = d[0]
                // console.log(file);
                let text = await file.text()
                // console.log(text);
                try {
                    let getF = frames(text)
                    // console.log(getF);
                    let out = {
                        file:inputFile,
                        images: getF.length,
                        palettet: exportKeyRex(text, 'global color table \\[', '\\]\n', 3)[0] - 0,
                        loop: loop(text),
                        frames: getF,
                        ...size(text),
                        size:this.getFileSize(inputFile.size),
                        time:time(getF)+'s'
                    }
                    res(out)
                } catch (error) {
                    // console.log(error);
                    throw error
                    res(null)
                }
            }).catch(e => {
                rej(e)
            })

        })
    },
     	// 文件大小
	getFileSize(size) {
		// 1000 Kb
		if (size < 999 * 1000) {
			return (size / 1000).toFixed(1) + 'KB'
		}
		// 10 Mb
		else {
			return (size / 1000 / 1000).toFixed(1) + 'MB'
		}
	},

}