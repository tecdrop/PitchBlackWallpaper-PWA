/* eslint-disable require-jsdoc */


import * as utils from "/scripts/utils.js";
import {OneColorPngWriter} from "/scripts/OneColorPngWriter.js";

const downloadLinkEl = document.getElementById("downloadLink");
const sizeInputEl = document.getElementById("sizeInput");


function writeAndDownloadWallpaper() {
    console.log("writeAndDownloadWallpaper");

    const widthHeight = utils.parseWidthHeight(sizeInputEl.value);
    if (Number.isNaN(widthHeight)) return;

    const pngWriter = new OneColorPngWriter(widthHeight[0], widthHeight[1], [0, 0, 0]);
    pngWriter.write();
    downloadLinkEl.download = "test.png";
    downloadLinkEl.href = pngWriter.getObjectURL();
    downloadLinkEl.click();
}

const downloadButtonEl = document.getElementById("downloadButton");
downloadButtonEl.addEventListener("click", writeAndDownloadWallpaper);


// const width = window.screen.width * window.devicePixelRatio;
// const height = window.screen.height * window.devicePixelRatio;
// console.log(`width ${width} height ${height}`);

