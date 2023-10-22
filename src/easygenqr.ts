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
}: QRDataOptions) => {
    const eccKey = ErrorCorrectLevel[
        errorCorrectionLevel
    ] as keyof typeof ErrorCorrectLevel;

    return QRC.encodeText(text, qrcodegen.Ecc[eccKey]);
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
            markerMode: 0
        },
        options
    );

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" 
                style="background-color: ${props.bgColor}"
                viewBox="${getViewBox(qr.size)}
              ">`;

    svg += renderMainSvgContent(qr, props);
    svg += "</svg>";
    return svg;
};
