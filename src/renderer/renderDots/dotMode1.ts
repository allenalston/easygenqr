import * as qrcodegen from "../../qrgenerator";
import { QRCodeOptions } from "../../types/qrcode";
import { isDotModule } from "../../utils";

export const renderDotsMode1 = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    let g = `<g fill="${options.dotColor}">`;
    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.getModule(x, y) && isDotModule(qr.size, x, y)) {
                g += `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.5" />`;
            }
        }
    }
    g += "</g>";

    return g;
};
