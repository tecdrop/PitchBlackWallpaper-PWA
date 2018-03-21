/* eslint-disable no-console */

import {crc32} from "/scripts/crc32.js";


export class BufferHelper {

    constructor(buffer) {
        this.offset = 0;

        this.uint8Buf = new Uint8Array(buffer);
        this.dataView = new DataView(buffer);
    }

    getOffset() {
        return this.offset;
    }

    writeByteArray(value) {
        this.uint8Buf.set(value, this.offset);
        this.offset += value.length;
    }

    writeUint8(value) {
        this.uint8Buf[this.offset] = value;
        this.offset += 1;
    }

    writeUint32(value) {
        this.dataView.setUint32(this.offset, value);
        this.offset += 4;
    }

    resetCRC() {
        this.crcStart = this.offset;
    }

    writeCRC() {
        const crc = crc32(this.uint8Buf, this.crcStart, this.offset);
        this.writeUint32(crc);
        return crc;
    }
}
