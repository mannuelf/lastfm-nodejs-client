/**
 * Pure TypeScript MD5 implementation.
 * Uses only TextEncoder and DataView — available in Node.js >=18 and all modern browsers.
 * Required because crypto.subtle does not support MD5 (deprecated algorithm),
 * and node:crypto is not available in browser environments.
 */

// Precomputed: T[i] = floor(2^32 * |sin(i+1)|)
const T = Array.from({ length: 64 }, (_, i) =>
  (Math.floor(2 ** 32 * Math.abs(Math.sin(i + 1)))) >>> 0,
);

// Per-round shift amounts
const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

function rotl(x: number, n: number): number {
  return (x << n) | (x >>> (32 - n));
}

export function md5(message: string): string {
  const bytes = new TextEncoder().encode(message);
  const len = bytes.length;

  // Pad: 0x80 byte, zero bytes, then 64-bit little-endian bit length
  const padded = new Uint8Array(Math.ceil((len + 9) / 64) * 64);
  padded.set(bytes);
  padded[len] = 0x80;
  const dv = new DataView(padded.buffer);
  const bitLen = len * 8;
  dv.setUint32(padded.length - 8, bitLen >>> 0, true);
  dv.setUint32(padded.length - 4, Math.floor(bitLen / 0x100000000), true);

  // Initial hash state
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  // Process each 512-bit block
  for (let i = 0; i < padded.length; i += 64) {
    const M = Array.from({ length: 16 }, (_, j) => dv.getUint32(i + j * 4, true));

    let A = a0, B = b0, C = c0, D = d0;

    for (let j = 0; j < 64; j++) {
      let F: number, g: number;

      if (j < 16)       { F = (B & C) | (~B & D); g = j; }
      else if (j < 32)  { F = (D & B) | (~D & C); g = (5 * j + 1) % 16; }
      else if (j < 48)  { F = B ^ C ^ D;           g = (3 * j + 5) % 16; }
      else              { F = C ^ (B | ~D);         g = (7 * j) % 16; }

      F = (F + A + T[j]! + M[g]!) >>> 0;
      A = D; D = C; C = B;
      B = (B + rotl(F, S[j]!)) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  // Encode as little-endian hex
  return [a0, b0, c0, d0].map(n => {
    const buf = new DataView(new ArrayBuffer(4));
    buf.setUint32(0, n, true);
    return Array.from(new Uint8Array(buf.buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }).join('');
}
