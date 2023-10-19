export enum ErrorCorrectLevel {
    LOW = 0,
    MEDIUM = 1,
    QUARTILE = 2,
    HIGH = 3
}

// marker modes for the center and border
export enum MarkerModes {
    Base = 0, // border square and center square
    MarkerMode1 = 1, // border rounded corner and center rounded corner
    MarkerMode2 = 2, // border circle and center circle
    MarkerMode3 = 3, // border square and center circle
    MarkerMode4 = 4 // border circle and center square
}

// qr data options
export interface QRDataOptions {
    text: string; // qr code text
    errorCorrectionLevel?: ErrorCorrectLevel; // error correction level 0=>LOW 1=>MEDIUM 2=>QUARTILE 3=>HIGH
}

// qr code options for render svg
export interface QRCodeOptions {
    bgColor: string; // qr code background color
    dotColor: string; // qr code dot color
    markerColor: string; // marker color
    dotMode: number; // dot style 0=>SQUARE 1=>CIRCLE
    markerMode: MarkerModes; // marker style
}
