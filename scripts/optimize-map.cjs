const fs = require('fs');
const zlib = require('zlib');

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function updateCrc(crc, buf) {
  let c = crc ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data ? data.length : 0;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  if (len > 0) {
    data.copy(buf, 8);
  }
  let crc = updateCrc(0, buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

async function run() {
  console.log('Starting Actors Map downscaling process...');
  const srcPath = 'public/assets/actors-map.png';
  const outPath = 'public/assets/actors-map-optimized.png';

  const inWidth = 31362;
  const inHeight = 25881;
  const scale = 8;
  const outWidth = Math.floor(inWidth / scale); // 3920
  const outHeight = Math.floor(inHeight / scale); // 3235
  const bpp = 4;
  const rowBytes = inWidth * bpp; // 125448
  const rawRowSize = 1 + rowBytes; // 125449

  console.log(`Input: ${inWidth}x${inHeight} -> Output: ${outWidth}x${outHeight} (scale factor: ${scale})`);

  // Open destination stream
  const outStream = fs.createWriteStream(outPath);
  // PNG Signature
  outStream.write(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(outWidth, 0);
  ihdrData.writeUInt32BE(outHeight, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  outStream.write(makeChunk('IHDR', ihdrData));

  // Prepare deflate stream
  const deflate = zlib.createDeflate({ level: 6 });
  deflate.on('data', (compressedChunk) => {
    outStream.write(makeChunk('IDAT', compressedChunk));
  });

  // Read IDAT from source
  const fd = fs.openSync(srcPath, 'r');
  const stat = fs.fstatSync(fd);
  let pos = 8;
  let idatBuf = null;
  const header = Buffer.alloc(8);
  while (pos < stat.size) {
    fs.readSync(fd, header, 0, 8, pos);
    const len = header.readUInt32BE(0);
    const type = header.toString('ascii', 4, 8);
    if (type === 'IDAT') {
      idatBuf = Buffer.alloc(len);
      fs.readSync(fd, idatBuf, 0, len, pos + 8);
      break;
    }
    pos += 12 + len;
  }
  fs.closeSync(fd);

  let prevRow = Buffer.alloc(rowBytes);
  let currRow = Buffer.alloc(rowBytes);
  let bufferQueue = Buffer.alloc(0);
  let rowsDecoded = 0;

  // Accumulator for 8 rows of box filtering
  const accum = new Uint32Array(outWidth * 4);
  const outRowBuf = Buffer.alloc(1 + outWidth * 4);
  outRowBuf[0] = 0; // Filter 0 (None)

  let rowsInAccum = 0;
  let outRowsWritten = 0;

  const inflate = zlib.createInflate();

  await new Promise((resolve, reject) => {
    inflate.on('data', (chunk) => {
      bufferQueue = Buffer.concat([bufferQueue, chunk]);

      while (bufferQueue.length >= rawRowSize) {
        const filter = bufferQueue[0];
        const raw = bufferQueue.subarray(1, rawRowSize);

        if (filter === 0) {
          raw.copy(currRow);
        } else if (filter === 1) {
          for (let i = 0; i < rowBytes; i++) {
            const left = i >= bpp ? currRow[i - bpp] : 0;
            currRow[i] = (raw[i] + left) & 0xff;
          }
        } else if (filter === 2) {
          for (let i = 0; i < rowBytes; i++) {
            currRow[i] = (raw[i] + prevRow[i]) & 0xff;
          }
        } else if (filter === 3) {
          for (let i = 0; i < rowBytes; i++) {
            const left = i >= bpp ? currRow[i - bpp] : 0;
            const up = prevRow[i];
            currRow[i] = (raw[i] + Math.floor((left + up) / 2)) & 0xff;
          }
        } else if (filter === 4) {
          for (let i = 0; i < rowBytes; i++) {
            const a = i >= bpp ? currRow[i - bpp] : 0;
            const b = prevRow[i];
            const c = i >= bpp ? prevRow[i - bpp] : 0;
            currRow[i] = (raw[i] + paeth(a, b, c)) & 0xff;
          }
        }

        // Accumulate into outWidth blocks
        if (outRowsWritten < outHeight) {
          for (let outX = 0; outX < outWidth; outX++) {
            const inXStart = outX * scale;
            const outBase = outX * 4;
            let r = 0, g = 0, b = 0, a = 0;
            for (let s = 0; s < scale; s++) {
              const inBase = (inXStart + s) * 4;
              r += currRow[inBase];
              g += currRow[inBase + 1];
              b += currRow[inBase + 2];
              a += currRow[inBase + 3];
            }
            accum[outBase] += r;
            accum[outBase + 1] += g;
            accum[outBase + 2] += b;
            accum[outBase + 3] += a;
          }
          rowsInAccum++;

          if (rowsInAccum === scale) {
            const divisor = scale * scale;
            for (let outX = 0; outX < outWidth; outX++) {
              const outBase = outX * 4;
              outRowBuf[1 + outBase] = Math.round(accum[outBase] / divisor);
              outRowBuf[1 + outBase + 1] = Math.round(accum[outBase + 1] / divisor);
              outRowBuf[1 + outBase + 2] = Math.round(accum[outBase + 2] / divisor);
              outRowBuf[1 + outBase + 3] = Math.round(accum[outBase + 3] / divisor);
            }
            deflate.write(outRowBuf);
            accum.fill(0);
            rowsInAccum = 0;
            outRowsWritten++;
          }
        }

        const tmp = prevRow;
        prevRow = currRow;
        currRow = tmp;

        bufferQueue = bufferQueue.subarray(rawRowSize);
        rowsDecoded++;
        if (rowsDecoded % 3000 === 0) {
          console.log(`Progress: ${rowsDecoded}/${inHeight} rows (${Math.round(rowsDecoded/inHeight*100)}%), outRows: ${outRowsWritten}/${outHeight}`);
        }
      }
    });

    inflate.on('end', () => {
      console.log(`Decompression complete. Total rows processed: ${rowsDecoded}`);
      deflate.end();
    });

    deflate.on('end', () => {
      outStream.write(makeChunk('IEND', Buffer.alloc(0)));
      outStream.end(() => {
        console.log(`Successfully written ${outPath}!`);
        resolve();
      });
    });

    inflate.on('error', reject);
    deflate.on('error', reject);

    inflate.write(idatBuf);
    inflate.end();
  });
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
