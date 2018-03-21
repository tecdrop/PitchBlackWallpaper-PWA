/* eslint-disable require-jsdoc */


import {OneColorPngWriter} from "/scripts/OneColorPngWriter.js";

console.log("test");
const pngWriter = new OneColorPngWriter(3000, 3000, [0, 0, 0]);
pngWriter.write();

const downloadLinkEl = document.getElementById("download");
downloadLinkEl.download = "test.png";
downloadLinkEl.href = pngWriter.getObjectURL();

const width = window.screen.width * window.devicePixelRatio;
const height = window.screen.height * window.devicePixelRatio;
console.log(`width ${width} height ${height}`);
