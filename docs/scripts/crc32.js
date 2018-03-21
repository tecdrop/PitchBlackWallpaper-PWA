/* eslint-disable require-jsdoc */
/* eslint-disable no-bitwise */
/* eslint-disable id-length */
/* eslint-disable no-extra-parens */

function makeCRCTable() {
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        crcTable[n] = c;
    }
    console.log("makeCRCTable");
    return crcTable;
}

let crcTable = null;

export function crc32(buffer, start, end) {
    crcTable = crcTable || makeCRCTable();

    let crc = -1;
    for (let index = start; index < end; index++) {
        crc = crcTable[(crc ^ buffer[index]) & 0xff] ^ (crc >>> 8);
    }

    // for (const byte of buffer) {
    //     crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    // }
    return (crc ^ -1) >>> 0;
}
