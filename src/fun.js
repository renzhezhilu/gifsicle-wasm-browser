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
    }
}