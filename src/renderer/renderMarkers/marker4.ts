import { QRCodeOptions } from "../../types/qrcode";
import * as qrcodegen from "../../qrgenerator";
import { getMarkerPoints } from "../../utils";

// Basic mode, border circle and center square
export const renderMarker4 = (qr: qrcodegen.QrCode, options: QRCodeOptions) => {
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
    const r1 = l / 2;
    const k = 0.552284749831;
    const r2 = r1 - 1;

    let outer = `<g><path d="M${xMin + r1},${yMin}h0
                            c${r1 * k},${0} ${r1},${r1 * (1 - k)} ${r1},${r1}
                            v0
                            c${0},${r1 * k} ${-r1 * (1 - k)},${r1} ${-r1},${r1}
                            h0
                            c${-r1 * k},${0} ${-r1},${
                                -r1 * (1 - k)
                            } ${-r1},${-r1}
                            v0
                            c${0},${-r1 * k} ${r1 * (1 - k)},${-r1} ${r1},${-r1}
                            M${xMax},${yMax - r2}v0
                            c${0},${-r2 * k} ${
                                -r2 * (1 - k)
                            },${-r2} ${-r2},${-r2}
                            v0
                            c${-r2 * k},${0} ${-r2},${r2 * (1 - k)} ${-r2},${r2}
                            v0
                            c${0},${r2 * k} ${r2 * (1 - k)},${r2} ${r2},${r2}
                            v0
                            c${r2 * k},${0} ${r2},${-r2 * (1 - k)} ${r2},${-r2}
                            v0z
                    "/>
                </g>`;

    let inner = `<g>
            <rect width="${l - 4.5}" height="${l - 4.5}" x="${
                xMin + 2.25
            }" y="${yMin + 2.25}" />
    </g>`;

    return outer + inner;
}
