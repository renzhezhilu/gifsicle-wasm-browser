"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gifsicle = _interopRequireDefault(require("./gifsicle"));

var _types = require("./types");

var _options = require("./options");

var _io = require("./io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @param {Buffer} image Image input buffer
 * @param {EncodeOptions} encodeOptions Encoding options passed to Gifsicle
 * @returns {Buffer} Processed image buffer
 */


const encode = async (image, encodeOptions = {}) => {
  await initModule();
  return new Promise((resolve, reject) => {
    // merge default options
    const filledEncodeOptions = { ..._options.defaultEncodeOptions,
      ...encodeOptions
    }; // build arguments

    const gifsicleArguments = [// ignore gifsicle warnings
    '--no-warnings', // remove application extensions from the input image
    '--no-app-extensions', // set optimization level
    `--optimize=${filledEncodeOptions.optimizationLevel}`, // turn on interlacing
    filledEncodeOptions.interlaced === true ? '--interlace' : false, // set number of colors
    typeof filledEncodeOptions.colors === 'number' ? `--colors=${filledEncodeOptions.colors}` : false, // resize image
    ...(filledEncodeOptions.width || filledEncodeOptions.height ? ['--resize', `${filledEncodeOptions.width || '_'}x${filledEncodeOptions.height || '_'}`] : []), // set input & output file names
    '-i', '/input.gif', '-o', '/output.gif'].filter(Boolean);
    let resolved = false;
    (0, _gifsicle.default)({
      stdout: _io.stdout,
      stderr: _io.stderr,
      arguments: gifsicleArguments,
      input: new Uint8Array(image.buffer),
      output: res => {
        resolve(Buffer.from(res));
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

var _default = encode;
exports.default = _default;
module.exports = encode;