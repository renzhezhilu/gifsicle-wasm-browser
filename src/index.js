"use strict";

import _gifsicle from './gifsicle.js'
import _io from './io.js'

const queue = [];
/**
 * Initialize the gifsicle module
 */

const initModule = () => {
	return new Promise(resolve => {
		// add a new job to the queue
		queue.push(resolve); // start it if there is no queue

		if (queue.length === 1) {
			queue[0]();
		}
	});
};
/**
 * Reset the gifsicle module
 */
const resetModule = () => {
	if (queue.length > 0) {
		// remove finished job
		queue.shift(); // trigger next job
		if (queue.length > 0) {
			queue[0]();
		}
	}
};
/**
 * Encode an input image using Gifsicle
 *
 * @async
 * @param {Buffer} data Image input buffer
 * @param {EncodeOptions} command 
 * @returns {Buffer} Processed image buffer
 */
const encode = async (obj={}) => {
	let {
		data=null,
		command=[]
	} = obj
	await initModule();
	return new Promise((resolve, reject) => {

		const gifsicleArguments = [ 
			// ignore gifsicle warnings
			'--no-warnings',
			// remove application extensions from the input image
			'--no-app-extensions',
			...command,
			// `--lossy=${filledEncodeOptions.lossy}`,
			// set input & output file names
			'-i', '/input.gif', '-o', '/output.gif'
		]

		let resolved = false;
		(0, _gifsicle)({
			stdout: _io.stdout,
			stderr: _io.stderr,
			arguments: gifsicleArguments,
			// input: new Uint8Array(image.buffer),
			input: data,
			output: res => {
				resolve(res);
				resolved = true;
			}
		}).then(() => {
			(0, _io.flush)();

			if (!resolved) {
				reject();
			}

			resetModule();
		});
	});
};
export default encode
