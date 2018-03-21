/**
 * Pitch Black Wallpaper 
 * @see https://pitchblackwallpaper.tecdrop.com
 * @copyright (c) 2018 Tecdrop
 * @license MIT
 * 
 * @file Writes a one color PNG image file with minimal memory allocation.
 */

/* global Zlib */

import { BufferHelper } from "/scripts/BufferHelper.js";

/** @const PNG signature. */
const SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

/** @const IHDR - image header chunk type. */
const IHDR = [73, 72, 68, 82];

/** @const PLTE - palette table chunk type. */
const PLTE = [80, 76, 84, 69];

/** @const IDAT - image data chunk type. */
const IDAT = [73, 68, 65, 84];

/** @const IEND - image trailer chunk type. */
const IEND = [73, 69, 78, 68];

/** @const Image bit depth. */
const BIT_DEPTH = 1;

/** @const Indexed-colour type. */
const COLOR_INDEXED = 3;

/** @const Compression method 0 (deflate). */
const COMPRESSION_DEFLATE = 0;

/** @const Filter type 0 (none). */
const FILTER_NONE = 0;

/** @const Interlace method 0 (null). */
const INTERLACE_NONE = 0;


/** Class that writes a one color PNG image file with minimal memory allocation. */
export class OneColorPngWriter {

    /**
     * Creates a new One Color PNG Writer object with the specified image width, height, and RGB color.
     * @param {number} width The width of the image.
     * @param {number} height The height of the image.
     * @param {Array} rgb The color of the image.
     */
    constructor(width, height, rgb) {
        this.width = width;
        this.height = height;
        this.rgb = rgb;
    }

    /**
     * Writes the one color PNG image to an ArrayBuffer.
     * @returns {void}
     */
    write() {
        console.log(`Starting to write a ${this.width} x ${this.height} PNG image`);

        // Generate the compressed PNG image data
        this.generateImageData();

        // Calculate the size of the ArrayBuffer that needs to be allocated (the PNG size)
        // 8 (SIGNATURE) + 25 (IHDR) + 15 (PLTE) + 12 (IDAT fixed part) + Compressed image data size + 12 (IEND)
        const size = 8 + 25 + 15 + 12 + this.compressed.length + 12;

        // Allocate the ArrayBuffer, and create the BufferHelper
        this.buffer = new ArrayBuffer(size);
        this.bufHelp = new BufferHelper(this.buffer);

        // Write the PNG image
        this.bufHelp.writeByteArray(SIGNATURE);             // Write PNG signature
        this.writeIHDRChunk();                              // Write IHDR chuck (must appear first)
        this.writePLTEChunk();                              // Write PLTE chunk (must appear before IDAT)
        this.writeIDATChunk();                              // Write IDAT chunk
        this.writeIENDChunk();                              // Write IEND chunk

        // Log some useful control information
        console.log(`PNG image size: ${size}, Offset: ${this.bufHelp.getOffset()}`);
    }

    /**
     * Writes the IHDR, the image header chunk.
     * @returns {void}
     */
    writeIHDRChunk() {
        this.bufHelp.writeUint32(13);                       // Write chunk size
        this.bufHelp.resetCRC();                            // Reset CRC
        this.bufHelp.writeByteArray(IHDR);                  // Write chunk type
        this.bufHelp.writeUint32(this.width);               // Write image width
        this.bufHelp.writeUint32(this.height);              // Write image height
        this.bufHelp.writeUint8(BIT_DEPTH);                 // Write image bit depth
        this.bufHelp.writeUint8(COLOR_INDEXED);             // Write indexed-colour type
        this.bufHelp.writeUint8(COMPRESSION_DEFLATE);       // Write compression method
        this.bufHelp.writeUint8(FILTER_NONE);               // Write filter type
        this.bufHelp.writeUint8(INTERLACE_NONE);            // Write interlace method
        this.bufHelp.writeCRC();                            // Write CRC
    }

    /**
     * Writes the PLTE, the palette table chunk.
     * @returns {void}
     */
    writePLTEChunk() {
        this.bufHelp.writeUint32(3);                        // Write chunk size (1 color, 3 bytes for R, G, B)
        this.bufHelp.resetCRC();                            // Reset CRC
        this.bufHelp.writeByteArray(PLTE);                  // Write chunk type
        this.bufHelp.writeUint8(this.rgb[0]);               // Write Red component
        this.bufHelp.writeUint8(this.rgb[1]);               // Write Green component
        this.bufHelp.writeUint8(this.rgb[2]);               // Write Blue component
        this.bufHelp.writeCRC();                            // Write CRC
    }

    /**
     * Generates the compressed PNG image data.
     * @returns {void}
     */
    generateImageData() {
        // Calculate the number of pixels per byte, and the number of bytes per scanline
        const pixelsPerByte = 8 / BIT_DEPTH;
        let bytesPerScanline = Math.trunc((this.width + pixelsPerByte - 1) / pixelsPerByte);

        // +1 because the first byte of the scanline is the filter method (0)
        bytesPerScanline += 1;

        // Because we have a palette with a single color, the image data is 0 - entry 0 in the palette
        // The image data is automatically initialized to 0 just by allocating it
        const data = new Uint8Array(bytesPerScanline * this.height);

        // Compress the PNG image data using the Zlib deflate compression algorithm
        const deflate = new Zlib.Deflate(data, { compressionType: Zlib.Deflate.CompressionType.FIXED });
        this.compressed = deflate.compress();
    }

    /**
     * Writes the IDAT, the image data chunks.
     * @returns {void}
     */
    writeIDATChunk() {
        this.bufHelp.writeUint32(this.compressed.length);   // Write chunk size
        this.bufHelp.resetCRC();                            // Reset CRC
        this.bufHelp.writeByteArray(IDAT);                  // Write chunk type
        this.bufHelp.writeByteArray(this.compressed);       // Write compressed data
        this.bufHelp.writeCRC();                            // Write CRC
    }

    /**
     * Writes the IEND, the last chunk in a PNG datastream.
     * @returns {void}
     */
    writeIENDChunk() {
        this.bufHelp.writeUint32(0);                        // Write chunck size (0)
        this.bufHelp.resetCRC();                            // Reset CRC
        this.bufHelp.writeByteArray(IEND);                  // Write chunk type
        this.bufHelp.writeCRC();                            // Write CRC
    }

    /**
     * Return the generated one color PNG image as an object URL.
     * @returns {Object} The PNG image object URL.
     */
    getObjectURL() {
        const blob = new Blob([this.buffer], { type: "image/png" });
        return URL.createObjectURL(blob);
    }
}
