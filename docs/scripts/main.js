/* eslint-disable require-jsdoc */


import {OneColorPngWriter} from "/scripts/OneColorPngWriter.js";


const pngWriter = new OneColorPngWriter(1920, 1080, [0, 0, 0]);
pngWriter.write();

const downloadLinkEl = document.getElementById("download");
downloadLinkEl.download = "test.png";
downloadLinkEl.href = pngWriter.getObjectURL();

const width = window.screen.width * window.devicePixelRatio;
const height = window.screen.height * window.devicePixelRatio;
console.log(`width ${width} height ${height}`);
