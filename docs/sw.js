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
    "revision": "8387cd2e3166de047b25991a750a4b77"
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
    "revision": "001194de52700d28dbbbff9265d828b5"
  },
  {
    "url": "scripts/OneColorPngWriter.js",
    "revision": "c545fd1daf5df21aca0497b1f9bb59d3"
  },
  {
    "url": "styles/main.css",
    "revision": "61125e18c712549d3d77e9450574858d"
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
