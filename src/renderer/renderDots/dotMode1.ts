import * as qrcodegen from "../../qrgenerator";
import { QRCodeOptions } from "../../types/qrcode";
import { isDotModule, generateLogoAttrs } from "../../utils";

export const renderDotsMode1 = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    const { logoWidthInQR, logoHeightInQR, logoX, logoY } =
        generateLogoAttrs(qr);

    let g = `<g fill="${options.dotColor}">`;
    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            // if options.logo is defined
            if (
                options.logo &&
                options.withLogoBg &&
                x >= logoX &&
                x <= logoX + logoWidthInQR - 1 &&
                y >= logoY &&
                y <= logoY + logoHeightInQR - 1
            ) {
                continue;
            }

            if (qr.getModule(x, y) && isDotModule(qr.size, x, y)) {
                g += `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.5" />`;
            }
        }
    }
    g += "</g>";

    if (options.logo) {
        const img = `<image xlink:href="${options.logo}" width="${
            logoWidthInQR - 1
        }"  height="${logoHeightInQR - 1}"  x="${logoX + 1 / 2}" 
        y="${logoY + 1 / 2}"/>`;
        g += "<g>";
        g += img;
        g += "</g>";
    }

    return g;
};
