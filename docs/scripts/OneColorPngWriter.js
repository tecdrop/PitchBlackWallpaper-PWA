/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import {BufferHelper} from "/scripts/BufferHelper.js";

const SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
const IHDR = [73, 72, 68, 82];

const PLTE = [80, 76, 84, 69];
const IDAT = [73, 68, 65, 84];
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

        this.prepareIDATData();
        console.log(this.compressed);

        this.buffer = new ArrayBuffer(72 + this.compressed.length);
        console.log(this.buffer);

        this.bufferHelper = new BufferHelper(this.buffer);
        this.bufferHelper.logOffset();

        // Write PNG signature
        this.bufferHelper.writeByteArray(SIGNATURE);

        // Write IHDR chuck (must appear first)
        this.writeIHDRChunk();

        // Write PLTE chunk (must appear before IDAT)
        this.writePLTEChunk();

        // Write IDAT chunk
        this.writeIDATChunks();

        // Write IEND chunk
        this.writeIENDChunk();


        console.log(this.buffer);
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

    prepareIDATData() {
        const pixelsPerByte = 8 / BIT_DEPTH;
        const bytesPerRow = Math.trunc((this.width + pixelsPerByte - 1) / pixelsPerByte) + 1;
        const data = new Uint8Array(bytesPerRow * this.height);

        const deflate = new Zlib.Deflate(data, { compressionType: Zlib.Deflate.CompressionType.FIXED });
        this.compressed = deflate.compress();
    }

    /**
     * Writes the IDAT, the image data chunks.
     * @returns {void}
     */
    writeIDATChunks() {

        // Calculate number of bytes to write per row
        // const pixelsPerByte = 8 / BIT_DEPTH;
        // const bytesPerRow = (this.width + samplesPerByte - 1) / samplesPerByte;
        // const bytesPerRow = Math.trunc((this.width + samplesPerByte - 1) / samplesPerByte);
        // const bytesPerRow = Math.trunc((this.width + pixelsPerByte - 1) / pixelsPerByte) + 1;
        // console.log(bytesPerRow);

        // Because we have a palette with a single color, the image data is 0 - entry 0 in the palette
        // The image data row is automatically initialized to 0 just by allocating it
        // byte[] lineOut = new byte[bytesPerRow];
        // const data = new Uint8Array(bytesPerRow * this.height);

        // const deflate = new Zlib.Deflate(data);
        // const deflate = new Zlib.Deflate(data, { compressionType: Zlib.Deflate.CompressionType.FIXED });
        // const compressed = deflate.compress();

        // Chunk size
        this.bufferHelper.writeUint32(this.compressed.length);
        // console.log(`compressed: ${compressed} length: ${compressed.length}`);

        this.bufferHelper.resetCRC();
        this.bufferHelper.writeByteArray(IDAT);
        // this.bufferHelper.logOffset();

        this.bufferHelper.writeByteArray(this.compressed);
        // this.bufferHelper.logOffset();
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

    getObjectURL() {
        const blob = new Blob([this.buffer], {type: "image/png"});
        return URL.createObjectURL(blob);
    }
}
