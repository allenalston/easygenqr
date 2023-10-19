import { QRCodeOptions } from "../../types/qrcode";
import * as qrcodegen from "../../qrgenerator";
import { getMarkerPoints } from "../../utils";

// Basic mode, border square and center square
export const renderMarkerBase = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    const { points1, points2, points3, l } = getMarkerPoints(qr);
    
    let group = `<g fill="${options.markerColor}">`;
    group += drawPath(points1, l) + drawPath(points2, l) + drawPath(points3, l);
    group += "</g>";

    return group;
};

function drawPath(points: number[][], l: number) {
    const xMax = points[points.length - 1][0];
    const yMax = points[points.length - 1][1];
    const xMin = points[0][0];
    const yMin = points[0][1];
    let outer = `<g><path d="M${xMin},${yMin}h${l}v${l}H${xMin}V${yMin}z M${xMax},${yMax}V${
        yMin + 1
    }H${xMin + 1}v${l - 2}h${l - 2}z"/></g>`;

    let inner = `<g><rect width="${l - 4}" height="${l - 4}" x="${
        xMin + 2
    }" y="${yMin + 2}"></rect></g>`;

    return outer + inner;
}
