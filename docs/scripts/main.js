/* eslint-disable require-jsdoc */


import {OneColorPngWriter} from "/scripts/OneColorPngWriter.js";


const pngWriter = new OneColorPngWriter(100, 100, [0, 0, 0]);
pngWriter.test();

const downloadLinkEl = document.getElementById("download");
downloadLinkEl.download = "test.png";
downloadLinkEl.href = pngWriter.getObjectURL();
