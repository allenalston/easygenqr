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
    const renderMarkerFunc = [
        renderMarkerBase,
        renderMarker1,
        renderMarker2,
        renderMarker3,
        renderMarker4
    ][options.markerMode];
    const renderDotsFunc = [renderDotsBase, renderDotsMode1][options.dotMode];

    const markersGroup = renderMarkerFunc(qr, options);
    const dotsGroup = renderDotsFunc(qr, options);

    return markersGroup + dotsGroup;
};