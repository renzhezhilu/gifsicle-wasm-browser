export default {
    // 读取blob基本信息
    readBlobBaseInfo(blob) {
        return {
            // blob: blob,
            format: {
                suffix: blob.type.split('/')[1],
                mime: blob.type
            },
            size: {
                byte: blob.size,
                text: this.getFileSize(blob.size)
            },
        }
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
    // 节流
	//   tool.throttle.run(() => {
	//     console.log(`Button 运行`);
	// }, 600);
	throttle: {
		val: null,
		run(fn, ms = 600) {
			clearTimeout(this.val);
			this.val = setTimeout(() => {
				fn();
			}, ms);
		},
	},
}