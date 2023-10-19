import * as qrcodegen from "../../qrgenerator";
import { QRCodeOptions } from "../../types/qrcode";
import { isDotModule } from "../../utils";

export const renderDotsBase = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    let g = `<g fill="${options.dotColor}">`;
    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.getModule(x, y) && isDotModule(qr.size, x, y)) {
                g += `<rect x="${x}" y="${y}" width="1" height="1" />`;
            }
        }
    }
    g += "</g>";

    return g;
};
