import * as qrcodegen from "../qrgenerator";
import { QRCodeOptions } from "../types/qrcode";
import { generateLogoAttrs, isDotModule, isLogoBackground } from "../utils";

const drawSquareDot = (x: number, y: number) => {
    return `<rect x="${x}" y="${y}" width="1" height="1" />`;
};

const drawCircleDot = (x: number, y: number) => {
    return `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.5" />`;
};

const drawRoundedDot = (
    x: number,
    y: number,
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    const count = qr.size;

    const _getNeighbor = (xOffset: number, yOffset: number): boolean => {
        if (
            x + xOffset < 0 ||
            y + yOffset < 0 ||
            x + xOffset >= count ||
            y + yOffset >= count
        ) {
            return false;
        }
        if (
            isLogoBackground(
                qr,
                x + xOffset,
                y + yOffset,
                options.withLogoBg as boolean
            )
        ) {
            return false;
        }
        return !!qr && qr.getModule(x + xOffset, y + yOffset);
    };

    const leftNeighbor = _getNeighbor(-1, 0) ? 1 : 0;
    const rightNeighbor = _getNeighbor(1, 0) ? 1 : 0;
    const topNeighbor = _getNeighbor(0, -1) ? 1 : 0;
    const bottomNeighbor = _getNeighbor(0, 1) ? 1 : 0;

    const neighborsCount =
        leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
        return `<rect x="${x}" y="${y}" width="1" height="1" rx="1" ry="1"/>`;
    }

    if (
        neighborsCount > 2 ||
        (leftNeighbor && rightNeighbor) ||
        (topNeighbor && bottomNeighbor)
    ) {
        return `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }

    if (neighborsCount === 2) {
        let rotation = 0;

        if (leftNeighbor && topNeighbor) {
            rotation = Math.PI / 2;
        } else if (topNeighbor && rightNeighbor) {
            rotation = Math.PI;
        } else if (rightNeighbor && bottomNeighbor) {
            rotation = -Math.PI / 2;
        }
        const cx = x + 1 / 2;
        const cy = y + 1 / 2;
        return `<path transform="rotate(${
            (180 * rotation) / Math.PI
        },${cx},${cy})" d="M ${x} ${y} v1 h1 v-0.5 a0.5 0.5, 0, 0, 0, -0.5 -0.5"/>`;
    }

    if (neighborsCount === 1) {
        let rotation = 0;

        if (topNeighbor) {
            rotation = Math.PI / 2;
        } else if (rightNeighbor) {
            rotation = Math.PI;
        } else if (bottomNeighbor) {
            rotation = -Math.PI / 2;
        }
        const cx = x + 1 / 2;
        const cy = y + 1 / 2;
        return `<path transform="rotate(${
            (180 * rotation) / Math.PI
        },${cx},${cy})" d="M ${x} ${y} v1 h0.5 a0.5 0.5, 0, 0, 0, 0 -1"/>`;
    }
};

const drawLineCircleDot = (
    x: number,
    y: number,
    qr: qrcodegen.QrCode,
    options: QRCodeOptions
) => {
    const count = qr.size;

    const _getNeighbor = (xOffset: number, yOffset: number): boolean => {
        if (
            x + xOffset < 0 ||
            y + yOffset < 0 ||
            x + xOffset >= count ||
            y + yOffset >= count
        ) {
            return false;
        }
        if (
            isLogoBackground(
                qr,
                x + xOffset,
                y + yOffset,
                options.withLogoBg as boolean
            )
        ) {
            return false;
        }
        return !!qr && qr.getModule(x + xOffset, y + yOffset);
    };

    const leftNeighbor = _getNeighbor(-1, 0) ? 1 : 0;
    const rightNeighbor = _getNeighbor(1, 0) ? 1 : 0;
    const topNeighbor = _getNeighbor(0, -1) ? 1 : 0;
    const bottomNeighbor = _getNeighbor(0, 1) ? 1 : 0;

    const neighborsCount =
        leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    const margin = 0.2;

    if (neighborsCount === 0) {
        return `<rect x="${x}" y="${y}" width="${1 - margin}" height="${
            1 - margin
        }" rx="1" ry="1" transform="translate(0, ${margin / 2})"/>`;
    }

    if (leftNeighbor && rightNeighbor) {
        return `<rect x="${x}" y="${y}" width="1" height="${1 - margin}" 
          transform="translate(0, ${margin / 2})"/>`;
    }

    if (!leftNeighbor && !rightNeighbor) {
        return `<rect x="${x}" y="${y}" width="${
            1 - margin
        }" height="${1 - margin}" rx="1" ry="1" transform="translate(0, ${
            margin / 2
        })"/>`;
    }

    if (!leftNeighbor && rightNeighbor) {
        return `<path d="M ${x + 1} ${y + margin / 2} v${1 - margin} h-${
            (1 - margin) / 2
        } a${(1 - margin) / 2} ${(1 - margin) / 2}, 0, 0, 1, 0 -${
            1 - margin
        }"/>`;
    }

    if (leftNeighbor && !rightNeighbor) {
        return `<path d="M ${x} ${y + margin / 2} v${1 - margin} h${
            (1 - margin) / 2
        } a${(1 - margin) / 2} ${(1 - margin) / 2}, 0, 0, 0, 0 -${
            1 - margin
        }"/>`;
    }
};

const drawLogoImage = (qr: qrcodegen.QrCode, options: QRCodeOptions) => {
    const { logoWidthInQR, logoHeightInQR, logoX, logoY } =
        generateLogoAttrs(qr);

    const img = `<image xlink:href="${options.logo}" width="${
        logoWidthInQR - 1
    }"  height="${logoHeightInQR - 1}"  x="${logoX + 1 / 2}" 
        y="${logoY + 1 / 2}"/>`;

    return `<g>${img}</g>`;
};

export const drawDots = (qr: qrcodegen.QrCode, options: QRCodeOptions) => {
    const drawDotFunc = [
        drawSquareDot,
        drawCircleDot,
        drawRoundedDot,
        drawLineCircleDot
    ][options.dotMode || 0];

    let g = `<g fill="${options.dotColor}">`;

    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            // if options.logo is defined
            if (
                options.logo &&
                isLogoBackground(qr, x, y, options.withLogoBg as boolean)
            ) {
                continue;
            }

            if (qr.getModule(x, y) && isDotModule(qr.size, x, y)) {
                g += drawDotFunc(x, y, qr, options);
            }
        }
    }
    g += "</g>";

    if (options.logo) {
        g += drawLogoImage(qr, options);
    }

    return g;
};
