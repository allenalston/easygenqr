import * as qrcodegen from "../qrgenerator";
import { QRCodeOptions } from "../types/qrcode";
import {
    renderMarkerBase,
    renderMarker1,
    renderMarker2,
    renderMarker3,
    renderMarker4
} from "./renderMarkers";
import { renderDotsBase, renderDotsMode1 } from "./renderDots";

export const getViewBox = (size: number) => {
    return `${-size / 10} ${-size / 10} ${size + (size / 10) * 2} ${
        size + (size / 10) * 2
    }`;
};

export const renderMainSvgContent = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    if (qr === null) return "";

    const markerMode = options?.markerMode;
    const dotMode = options?.dotMode;
    const markerModeRenderFuncs = [
        renderMarkerBase,
        renderMarker1,
        renderMarker2,
        renderMarker3,
        renderMarker4
    ];
    const dotModes = [renderDotsBase, renderDotsMode1];

    if (
        typeof markerMode !== "number" ||
        markerMode < 0 ||
        markerMode > markerModeRenderFuncs.length - 1
    ) {
        throw new Error("Marker mode must be a number between 0 and 4");
    }

    if (
        typeof dotMode !== "number" ||
        dotMode < 0 ||
        dotMode > dotModes.length - 1
    ) {
        throw new Error("Dot mode must be a number between 0 and 1");
    }

    const renderMarkerFunc = markerModeRenderFuncs[options.markerMode || 0]; // add a check to make sure options.markerMode is defined
    const renderDotsFunc = dotModes[options.dotMode || 0]; // add a check to make sure options.dotMode is defined

    const markersGroup = renderMarkerFunc(qr, options);
    const dotsGroup = renderDotsFunc(qr, options);

    return markersGroup + dotsGroup;
};
