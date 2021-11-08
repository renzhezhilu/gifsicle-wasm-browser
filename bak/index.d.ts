/// <reference types="node" />
import { EncodeOptions } from './types';
/**
 * Encode an input image using Gifsicle
 *
 * @async
 * @param {Buffer} image Image input buffer
 * @param {EncodeOptions} encodeOptions Encoding options passed to Gifsicle
 * @returns {Buffer} Processed image buffer
 */
declare const encode: (image: Buffer, encodeOptions?: EncodeOptions) => Promise<Buffer>;
export default encode;
export type { EncodeOptions } from './types';
