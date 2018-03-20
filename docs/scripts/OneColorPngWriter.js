/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import {BufferHelper} from "/scripts/BufferHelper.js";

const SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
const IHDR = [73, 72, 68, 82];

const PLTE = [80, 76, 84, 69];
const IEND = [73, 69, 78, 68];

/**
 * Image bit depth.
 */
const BIT_DEPTH = 1;

/**
 * Indexed-colour type.
 */
const COLOR_INDEXED = 3;

/**
 * Compression method 0 (deflate).
 */
const COMPRESSION_DEFLATE = 0;

/**
 * Filter type 0 (none).
 */
const FILTER_NONE = 0;

/**
 * Interlace method 0 (null).
 */
const INTERLACE_NONE = 0;

export class OneColorPngWriter {

    constructor(width, height, rgb) {
        this.width = width;
        this.height = height;
        this.rgb = rgb;
    }


    test() {
        const buffer = new ArrayBuffer(100);
        console.log(buffer);

        this.bufferHelper = new BufferHelper(buffer);
        this.bufferHelper.logOffset();

        // Write PNG signature
        this.bufferHelper.writeByteArray(SIGNATURE);

        // Write IHDR chuck (must appear first)
        this.writeIHDRChunk();

        // Write PLTE chunk (must appear before IDAT)
        this.writePLTEChunk();

        // Write IEND chunk
        this.writeIENDChunk();


        console.log(buffer);
        this.bufferHelper.logOffset();

    }

    /**
     * Writes the IHDR, the image header chunk.
     * @returns {void}
     */
    writeIHDRChunk() {
        // Standard IHDR chunk size
        this.bufferHelper.writeUint32(13);

        this.bufferHelper.resetCRC();
        this.bufferHelper.writeByteArray(IHDR);
        this.bufferHelper.writeUint32(this.width);
        this.bufferHelper.writeUint32(this.height);

        this.bufferHelper.writeUint8(BIT_DEPTH);
        this.bufferHelper.writeUint8(COLOR_INDEXED);
        this.bufferHelper.writeUint8(COMPRESSION_DEFLATE);
        this.bufferHelper.writeUint8(FILTER_NONE);
        this.bufferHelper.writeUint8(INTERLACE_NONE);

        this.bufferHelper.writeCRC();
    }

    /**
     * Writes the PLTE, the palette table chunk.
     * @returns {void}
     */
    writePLTEChunk() {
        // We only have one color, so the chunk size is 3 bytes (for R, G, B)
        this.bufferHelper.writeUint32(3);

        this.bufferHelper.resetCRC();
        this.bufferHelper.writeByteArray(PLTE);

        this.bufferHelper.writeUint8(this.rgb[0]);
        this.bufferHelper.writeUint8(this.rgb[1]);
        this.bufferHelper.writeUint8(this.rgb[2]);

        this.bufferHelper.writeCRC();
    }

    /**
     * Writes the IEND, the last chunk in a PNG datastream.
     * @returns {void}
     */
    writeIENDChunk() {
        // Chunk size is 0
        this.bufferHelper.writeUint32(0);

        this.bufferHelper.resetCRC();
        this.bufferHelper.writeByteArray(IEND);
        this.bufferHelper.writeCRC();
    }
}
