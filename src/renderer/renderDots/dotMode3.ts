import * as qrcodegen from "../../qrgenerator";
import { QRCodeOptions } from "../../types/qrcode";
import { drawDots } from "../draw";

export const renderDotsMode3 = (
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    return drawDots(qr, options);
};
