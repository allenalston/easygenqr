import * as qrcodegen from "../qrgenerator";

export const isDotModule = (size: number, x: number, y: number) => {
    if (x < 7 && y < 7) {
        return false;
    }
    if (x < 7 && y > size - 8) {
        return false;
    }
    if (x > size - 8 && y < 7) {
        return false;
    }

    return true;
};

export const getMarkerPoints = (qr: qrcodegen.QrCode) => {
    const l = 7;
    let points1 = [],
        points2 = [],
        points3 = [];
    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.getModule(x, y)) {
                if (y < l && x < l) {
                    points1.push([x, y]);
                } else if (y < l && x > qr.size - l - 1) {
                    points2.push([x, y]);
                } else if (y > qr.size - l - 1 && x < l) {
                    points3.push([x, y]);
                }
            }
        }
    }

    return {
        points1,
        points2,
        points3,
        l
    };
};

export const generateLogoAttrs = (qr: qrcodegen.QrCode) => {
    // const logoWidth = 120;
    // const logoHeight = 120;
    // let hw = logoWidth / 300;
    // let hh = logoHeight / 300;
    // if (hw > 0.3) {
    //     hw = 0.3;
    // }
    // if (hw < 0.2) {
    //     hw = 0.2;
    // }
    // if (hh > 0.3) {
    //     hh = 0.3;
    // }
    // if (hh < 0.2) {
    //     hh = 0.2;
    // }

    // TODO - set logo size

    const hw = 0.25;
    const hh = 0.25;

    const logoWidthInQR = Math.floor(hw * qr.size);
    const logoHeightInQR = Math.floor(hh * qr.size);
    const logoX = Math.floor((qr.size - logoWidthInQR) / 2);
    const logoY = Math.floor((qr.size - logoHeightInQR) / 2);

    return {
        logoX,
        logoY,
        logoWidthInQR,
        logoHeightInQR
    };
};

export const isLogoBackground = (
    qr: qrcodegen.QrCode,
    x: number,
    y: number,
    withLogoBg: boolean
) => {
    const { logoWidthInQR, logoHeightInQR, logoX, logoY } =
        generateLogoAttrs(qr);

    if (
        withLogoBg &&
        x >= logoX &&
        x <= logoX + logoWidthInQR - 1 &&
        y >= logoY &&
        y <= logoY + logoHeightInQR - 1
    ) {
        return true;
    }

    return false;
};
