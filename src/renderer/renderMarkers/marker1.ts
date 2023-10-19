import { QRCodeOptions } from "../../types/qrcode";
import * as qrcodegen from "../../qrgenerator";
import { getMarkerPoints } from "../../utils";

// Basic mode, border rounded corner and center rounded corner
export const renderMarker1 = (qr: qrcodegen.QrCode, options: QRCodeOptions) => {
    const { points1, points2, points3, l } = getMarkerPoints(qr);

    let group = `<g fill="${options.markerColor}">`;
    group += drawPath(points1, l) + drawPath(points2, l) + drawPath(points3, l);
    group += "</g>";

    return group;
};

function drawPath(points: number[][], l: number) {
    const r1 = 2;
    const r2 = r1 / 1.5;
    const xMax = points[points.length - 1][0];
    const yMax = points[points.length - 1][1];
    const xMin = points[0][0];
    const yMin = points[0][1];
    let outer = `<g><path d="M${xMin + r1},${yMin}h${l - r1 * 2}
                            c0,0 ${r1},0 ${r1},${r1}
                            v${l - r1 * 2}
                            c0,0 ${0},${r1} ${-r1},${r1}
                            h${-l + r1 * 2}
                            c0,0 ${-r1},0 ${-r1},${-r1}
                            v${-l + r1 * 2}
                            c0,0 ${0},${-r1} ${r1},${-r1}z
                            M${xMax},${yMax - r2}v${-l + r2 * 2 + 2}
                            c0,0 ${0},${-r2} ${-r2},${-r2}
                            h${-l + r2 * 2 + 2}
                            c0,0 ${-r2},0 ${-r2},${r2}
                            v${l - r2 * 2 - 2}
                            c0,0 ${0},${r2} ${r2},${r2}
                            h${l - r2 * 2 - 2}
                            c0,0 ${r2},0 ${r2},${-r2}z" />
                </g>`;

    const innerR = (r1 * 3) / 7;
    const innerXMax = points[points.length - 1][0] - 1;
    const innerYMax = points[points.length - 1][1] - 1;
    const innerXMin = points[0][0] + 2;
    const innerYMin = points[0][1] + 2;
    const innerL = innerXMax - innerXMin;

    let inner = `<g><path d="M${innerXMin + innerR},${innerYMin}
                            h${innerL - innerR * 2}
                            c0,0 ${innerR},0 ${innerR},${innerR}
                            v${innerL - innerR * 2}
                            c0,0 ${0},${innerR} ${-innerR},${innerR}
                            h${-innerL + innerR * 2}
                            c0,0 ${-innerR},0 ${-innerR},${-innerR}
                            v${-innerL + innerR * 2}
                            c0,0 ${0},${-innerR} ${innerR},${-innerR}z"
                /></g>`;

    return outer + inner;
}
