/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/YYPcyY
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "5f143067e8fee946c6509cec3620624a"
  },
  {
    "url": "scripts/BufferHelper.js",
    "revision": "48eb3244f65ffd650412d2f6a71deae6"
  },
  {
    "url": "scripts/crc32.js",
    "revision": "6508094207b2acd6f754e18f9588bf62"
  },
  {
    "url": "scripts/main.js",
    "revision": "30a260aebdb0e0f78bce488cf2e78bb3"
  },
  {
    "url": "scripts/OneColorPngWriter.js",
    "revision": "91a3da48e9544ec3e8d7d1204b4d0484"
  },
  {
    "url": "scripts/utils.js",
    "revision": "137374a92d904be5b14433d2b1136c63"
  },
  {
    "url": "styles/main.css",
    "revision": "5b7138a3b482d2496e5da2ffb8820ccd"
  },
  {
    "url": "styles/normalize.css",
    "revision": "fda27b856c2e3cada6e0f6bfeccc2067"
  },
  {
    "url": "images/icons/ic_screen_rotation_white_24px.svg",
    "revision": "3131b8954c81aa2c4cfb794f073c80b5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
