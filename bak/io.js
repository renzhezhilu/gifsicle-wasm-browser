"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flush = exports.stderr = exports.stdout = void 0;

/* eslint-disable no-console */
let out = '';
/**
 * Process stdout stream
 *
 * @param {number} char Next char in stream
 */

const stdout = char => {
  out += String.fromCharCode(char);

  if (char === 10) {
    console.log(out);
    out = '';
  }
};

exports.stdout = stdout;
let err = '';
/**
 * Process stderr stream
 *
 * @param {number} char Next char in stream
 */

const stderr = char => {
  err += String.fromCharCode(char);

  if (char === 10) {
    console.error(err);
    err = '';
  }
};
/**
 * Flush remaining buffer
 */


exports.stderr = stderr;

const flush = () => {
  if (out.length > 0) {
    console.log(out);
    out = '';
  }

  if (err.length > 0) {
    console.error(err);
    err = '';
  }
};

exports.flush = flush;