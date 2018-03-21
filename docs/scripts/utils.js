/* eslint-disable require-jsdoc */


function filterInt(value) {
    if (/^\d+$/.test(value)) {
        return Number(value);
    }
    return NaN;
}

export function parseWidthHeight(widthHeightString) {
    const widthHeight = widthHeightString.split("x");

    if (widthHeight.length === 2) {
        const width = filterInt(widthHeight[0]);
        const height = filterInt(widthHeight[1]);
        if (!Number.isNaN(width) && !Number.isNaN(height)) {
            return [width, height];
        }
    }

    return NaN;
}
