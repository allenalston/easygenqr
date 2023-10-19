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
