import * as qrcodegen from "./qrgenerator";
import {
    QRDataOptions,
    ErrorCorrectLevel,
    QRCodeOptions
} from "./types/qrcode";
import { getViewBox, renderMainSvgContent } from "./renderer";

const QRC = qrcodegen.QrCode;

export const encodeData = ({
    text,
    errorCorrectionLevel = 3
}: QRDataOptions): qrcodegen.QrCode => {
    if (text === "" || text === undefined || text === null)
        throw new Error("Text must be provided");

    if (errorCorrectionLevel < 0 || errorCorrectionLevel > 3)
        throw new Error("Error correction level must be between 0 and 3");

    const eccKey = ErrorCorrectLevel[
        errorCorrectionLevel
    ] as keyof typeof ErrorCorrectLevel;
    const segs = qrcodegen.QrSegment.makeSegments(text);

    return QRC.encodeSegments(segs, qrcodegen.Ecc[eccKey], 1, 40, -1, false);
};

export const generateSVGQRCode = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    const props = Object.assign(
        {
            bgColor: "#ffffff",
            dotColor: "#000000",
            markerColor: "#000000",
            dotMode: 0,
            markerMode: 0,
            withLogoBg: true
        },
        options
    );

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="background-color: ${props.bgColor}"
                viewBox="${getViewBox(qr.size)}
              ">`;

    svg += renderMainSvgContent(qr, props);
    svg += "</svg>";
    return svg;
};
