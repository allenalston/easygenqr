# easygenqr

This is a library for generating QR codes. Use encodeData to implement data parsing for qrcode, and then use generateSVGQRCode to generate svg for qrcode

- generate svg for qrcode

- custom styles

- add brand logo  

<img title="" src="https://i.imgur.com/K5UzU1Y.png" alt="">

## Installation

```bash
$ npm install easygenqr
or
$ yarn add easygenqr
or
$ pnpm add easygenqr
```

## Usage

### Vanilla js demo

```javascript
 const qr = encodeData({
    text: "Hello World!",
    errorCorrectionLevel: 3
 });

 const svg = generateSVGQRCode(qr,{
     bgColor: "#ffffff",
     dotColor: "#000000",
     dotMode: 0,
     markerColor: "#000000",
     markerMode: 0
 });

 // add to html
 const div = document.createElement("div");
 div.style.width = "300px";
 div.style.height = "300px";
 div.innerHTML = svg;
```

### Vue.js demo

```javascript
<script setup lang="ts">
import {
  encodeData,
  ErrorCorrectLevel,
  generateSVGQRCode,
  MarkerModes,
} from "easygenqr";

interface Props {
  text: string;
  width?: number;
  height?: number;
  ecc?: ErrorCorrectLevel;
  bgColor?: string;
  dotColor?: string;
  dotMode?: number;
  markerMode?: MarkerModes;
  markerColor?: string;
}

const props = defineProps<Props>();
const qrSVGString = ref<string>();
const qrData = ref<any>();

function render() {
  const qr = encodeData({
    text: props.text,
    errorCorrectionLevel: props.ecc || 1,
  });
  qrData.value = qr;
  qrSVGString.value = generateSVGQRCode(qr, {
    bgColor: props.bgColor || "#ffffff",
    dotColor: props.dotColor || "#000000",
    dotMode: props.dotMode || 0,
    markerMode: props.markerMode || 0,
    markerColor: props.markerColor || "#000000",
  });
}

watch(
  props,
  () => {
    render();
  },
  { immediate: true }
);
</script>

<template>
  <div
    :style="{
      width: props.width ? props.width + 'px' : '150px',
      height: props.height ? props.height + 'px' : '150px',
    }"
    v-html="qrSVGString"
  ></div>
</template>
```

### React.js demo

```javascript
import { encodeData, generateSVGQRCode } from 'easygenqr'

export default function QRCode(){
  const qr = encodeData({
    text: "Hello easygenqr!",
    errorCorrectionLevel: 1,
  });

  const svgString = generateSVGQRCode(qr, {
    bgColor: "#ffffff",
    dotColor: "#000000",
    dotMode: 0,
    markerMode: 0,
    markerColor: "#000000",
  })

  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}
```

## API

#### encodeData

| Parameters           | Type              | Default | Description                                                  |
| -------------------- | ----------------- | ------- | ------------------------------------------------------------ |
| text                 | string            |         | qr code text                                                 |
| errorCorrectionLevel | ErrorCorrectLevel | 3       | error correction level: 0=>LOW 1=>MEDIUM 2=>QUARTILE 3=>HIGH |

#### generateSVGQRCode

| Parameters | Type             | Default                                                                                                                                                                                           | Description                                                                                                                           |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| qr         | qrcodegen.QrCode |                                                                                                                                                                                                   | The data returned by encodeData()<br/>**refrence**: [QR Code generator library](https://www.nayuki.io/page/qr-code-generator-library) |
| options    | QRCodeOptions    | {<br/>            bgColor: "#ffffff",<br/>            dotColor: "#000000",<br/>            markerColor: "#000000",<br/>            dotMode: 0,<br/>            markerMode: 0,<br/>withLogo:true } | qr code options for render svg                                                                                                        |

`QRCodeOptions`:

```typescript
QRCodeOptions {
    bgColor?: string; // qr code background color
    dotColor?: string; // qr code dot color
    markerColor?: string; // marker color
    dotMode?: DotModes; // dot style 0=>SQUARE 1=>CIRCLE
    markerMode?: MarkerModes; // marker style
    logo?: string; // logo url
    withLogoBg?: boolean; // logo background is transparent or not
}
```

`DotModes`

| Value | Description |
| ----- | ----------- |
| 0     | Square      |
| 1     | Circle      |

`MarkerModes`

| Value | Description                                     |
| ----- | ----------------------------------------------- |
| 0     | Base: border square and center square           |
| 1     | border rounded corner and center rounded corner |
| 2     | border circle and center circle                 |
| 3     | border square and center circle                 |
| 4     | border circle and center square                 |

`logo`

Support Base64 or picture url.

`withLogoBg`

| Value          | Description                     |
| -------------- | ------------------------------- |
| true (default) | logo background is white.       |
| false          | logo background is transparent. |



## Developer

Using [tsup](https://tsup.egoist.dev/) to build easygenqr.

Generating data for qrcode based on https://www.nayuki.io/page/qr-code-generator-library

#### run  locally

```bash
npm run dev
```

#### open example

open example/index.html in browser

debug in index.html file

 

## Reference

**QR Code generator**: https://www.nayuki.io/page/qr-code-generator-library