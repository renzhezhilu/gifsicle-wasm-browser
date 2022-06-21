// 增加耗时
let gifsicle = {
	tool: {
		worker() {
			return `../src/worker.js`;
		},
		errorLink() {
			return " \n Check: https://github.com/renzhezhilu/gifsicle-wasm-browser";
		},
		testType(data) {
			return data instanceof Element
				? "element"
				: Object.prototype.toString
					.call(data)
					.replace(/\[object\s(.+)\]/, "$1")
					.toLowerCase();
		},
		async textToUrl(text) {
			let isBuild = false;
			let workerUrl = "";
			if (isBuild) {
				workerUrl = URL.createObjectURL(new Blob([this.worker()]));
			} else {
				workerUrl = this.worker();
			}
			console.log(workerUrl);
			return workerUrl;
		},
		loadCommand(command) {
			let type = this.testType(command);
			if (command.length === 0) {
				throw "<command> the content can not be blank" + this.errorLink();
			}
			if (type === "array") {
				return command;
			} else {
				throw (
					"<command> types:" + type + ", must be an array" + this.errorLink()
				);
			}
		},
		loadOne(file) {
			return new Promise(async (res, rej) => {
				let type = this.testType(file);
				// url
				if (["string"].includes(type)) {
					fetch(file)
						.then((d) => {
							if (d.status !== 200)
								throw "<" + file + ">" + " Url error!!!" + this.errorLink();
							return d.arrayBuffer();
						})
						.then((d) => res(d));
				}
				// blob
				else if (["blob", "file"].includes(type)) {
					file.arrayBuffer().then((d) => res(d));
				}
				// arraybuffer
				else if (["arraybuffer"].includes(type)) {
					res(file);
				}
				// other
				else {
					throw (
						"<input.file> types:" +
						type +
						", only supports Url, blob, file, arraybuffer" +
						this.errorLink()
					);
				}
			});
		},
		loadFile(input) {
			return new Promise(async (res, rej) => {
				let type = this.testType(input);
				if (type !== "array") {
					throw (
						"<input> types:" + type + ", only supports Array" + this.errorLink()
					);
				}
				if (input.length === 0) {
					throw "<input> the content can not be blank" + this.errorLink();
				}
				let loadTask = input.map((m) => this.loadOne(m.file));
				Promise.all(loadTask)
					.then(function (posts) {
						let bufArr = input.map((m, index) => {
							m.file = posts[index];
							return m;
						});
						res(bufArr);
					})
					.catch(function (reason) { });
			});
		},
		loadFolder(arr) {
			return new Promise(async (res, rej) => {
				let type = this.testType(arr);
				// url
				if (["array"].includes(type)) {
					res(arr);
				} else {
					throw (
						"<folder> types:" +
						type +
						", only supports Array" +
						this.errorLink()
					);
				}
			});
		},
	},
	run(obj = {}) {
		return new Promise(async (res, rej) => {
			let { input = [], command = "", folder = [] , start=_=>{}} = obj 
			let workerUrl = await this.tool.textToUrl();
			let newCommand = this.tool.loadCommand(command);
			let newFiles = await this.tool.loadFile(input);
			start(newFiles)
			let newFolder = await this.tool.loadFolder(folder);
			console.log(newCommand);
			console.log(newFiles);
			console.log(workerUrl);
			let myWorker = new Worker(workerUrl);
			myWorker.postMessage({
				data: newFiles,
				command: newCommand,
				folder: newFolder,
			});
			// 量化转换
			myWorker.onmessage = async function (e) {
				if (!e.data) {
					myWorker.terminate();
					res(null);
					return;
				}
				let outArr = [];
				for (let index = 0; index < e.data.length; index++) {
					const element = e.data[index];
					if (element.name.includes(".txt")) {
						let blob = new File([element.file], element.name, {
							type: "text/plain",
						});
						outArr.push(blob);
						// let text = await blob.text();
						// text = text.split("\n").map((m) => m + "<br>");
					} else {
						let gif = new File([element.file], element.name, {
							type: "image/gif",
						});
						outArr.push(gif);
					}
				}
				myWorker.terminate();
				res(outArr);
			};
			// 转换错误
			myWorker.onerror = function (e) {
				console.error(e);
				myWorker.terminate();
				res(null);
			};
			// console.log(obj);
		});
	},
};

export default gifsicle;
