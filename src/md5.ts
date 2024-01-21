import { BufferUtils, ByteOrder, SafeInteger, Uint32 } from "../deps.ts";

const _BITS_PER_BYTE = 8;

const _BLOCK_BYTES = 64;

const _DATA_SIZE_BYTES = 8;

type _ContextState = [
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
];

const _S = {
  S11: 7,
  S12: 12,
  S13: 17,
  S14: 22,
  S21: 5,
  S22: 9,
  S23: 14,
  S24: 20,
  S31: 4,
  S32: 11,
  S33: 16,
  S34: 23,
  S41: 6,
  S42: 10,
  S43: 15,
  S44: 21,
} as const;

type _S = typeof _S[keyof typeof _S];

function _initContextState(): _ContextState {
  return [
    0x67452301,
    0xEFCDAB89,
    0x98BADCFE,
    0x10325476,
  ];
}

function _f(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return ((x & y) | ((x ^ 0xFFFFFFFF) & z));
}

function _g(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return ((x & z) | (y & (z ^ 0xFFFFFFFF)));
}

function _h(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return (x ^ y ^ z);
}

function _i(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return (y ^ (x | (z ^ 0xFFFFFFFF)));
}

function _rotateLeft(x: SafeInteger, n: _S): Uint32 {
  const sx = Uint32.truncateFromSafeInteger(x);
  return Uint32.rotateLeft(sx, n);
}

function _ff(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: _S,
  ac: Uint32,
): Uint32 {
  return Uint32.truncateFromSafeInteger(
    _rotateLeft(a + _f(b, c, d) + x + ac, s) + b,
  );
}

function _gg(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: _S,
  ac: Uint32,
): Uint32 {
  return Uint32.truncateFromSafeInteger(
    _rotateLeft(a + _g(b, c, d) + x + ac, s) + b,
  );
}

function _hh(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: _S,
  ac: Uint32,
): Uint32 {
  return Uint32.truncateFromSafeInteger(
    _rotateLeft(a + _h(b, c, d) + x + ac, s) + b,
  );
}

function _ii(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: _S,
  ac: Uint32,
): Uint32 {
  return Uint32.truncateFromSafeInteger(
    _rotateLeft(a + _i(b, c, d) + x + ac, s) + b,
  );
}

function _readBlock(buffer: ArrayBuffer, byteOffset: SafeInteger): Uint32Array {
  const result = new Uint32Array(_BLOCK_BYTES / Uint32.BYTES);

  const reader = new DataView(buffer, byteOffset, _BLOCK_BYTES);
  for (let i = 0; i < (reader.byteLength / Uint32.BYTES); i++) {
    result[i] = reader.getUint32(i * Uint32.BYTES, true);
  }
  return result;
}

function _updateContextState(
  sourceBuffer: ArrayBuffer,
  byteOffset: SafeInteger,
  contextState: _ContextState,
): void {
  const block = _readBlock(sourceBuffer, byteOffset);
  let [a, b, c, d] = contextState;

  // 1

  // 1-1
  a = _ff(a, b, c, d, block[0], _S.S11, 0xD76AA478);
  d = _ff(d, a, b, c, block[1], _S.S12, 0xE8C7B756);
  c = _ff(c, d, a, b, block[2], _S.S13, 0x242070DB);
  b = _ff(b, c, d, a, block[3], _S.S14, 0xC1BDCEEE);

  // 1-2
  a = _ff(a, b, c, d, block[4], _S.S11, 0xF57C0FAF);
  d = _ff(d, a, b, c, block[5], _S.S12, 0x4787C62A);
  c = _ff(c, d, a, b, block[6], _S.S13, 0xA8304613);
  b = _ff(b, c, d, a, block[7], _S.S14, 0xFD469501);

  // 1-3
  a = _ff(a, b, c, d, block[8], _S.S11, 0x698098D8);
  d = _ff(d, a, b, c, block[9], _S.S12, 0x8B44F7AF);
  c = _ff(c, d, a, b, block[10], _S.S13, 0xFFFF5BB1);
  b = _ff(b, c, d, a, block[11], _S.S14, 0x895CD7BE);

  // 1-4
  a = _ff(a, b, c, d, block[12], _S.S11, 0x6B901122);
  d = _ff(d, a, b, c, block[13], _S.S12, 0xFD987193);
  c = _ff(c, d, a, b, block[14], _S.S13, 0xA679438E);
  b = _ff(b, c, d, a, block[15], _S.S14, 0x49B40821);

  // 2

  // 2-1
  a = _gg(a, b, c, d, block[1], _S.S21, 0xF61E2562);
  d = _gg(d, a, b, c, block[6], _S.S22, 0xC040B340);
  c = _gg(c, d, a, b, block[11], _S.S23, 0x265E5A51);
  b = _gg(b, c, d, a, block[0], _S.S24, 0xE9B6C7AA);

  // 2-2
  a = _gg(a, b, c, d, block[5], _S.S21, 0xD62F105D);
  d = _gg(d, a, b, c, block[10], _S.S22, 0x02441453);
  c = _gg(c, d, a, b, block[15], _S.S23, 0xD8A1E681);
  b = _gg(b, c, d, a, block[4], _S.S24, 0xE7D3FBC8);

  // 2-3
  a = _gg(a, b, c, d, block[9], _S.S21, 0x21E1CDE6);
  d = _gg(d, a, b, c, block[14], _S.S22, 0xC33707D6);
  c = _gg(c, d, a, b, block[3], _S.S23, 0xF4D50D87);
  b = _gg(b, c, d, a, block[8], _S.S24, 0x455A14ED);

  // 2-4
  a = _gg(a, b, c, d, block[13], _S.S21, 0xA9E3E905);
  d = _gg(d, a, b, c, block[2], _S.S22, 0xFCEFA3F8);
  c = _gg(c, d, a, b, block[7], _S.S23, 0x676F02D9);
  b = _gg(b, c, d, a, block[12], _S.S24, 0x8D2A4C8A);

  // 3

  // 3-1
  a = _hh(a, b, c, d, block[5], _S.S31, 0xFFFA3942);
  d = _hh(d, a, b, c, block[8], _S.S32, 0x8771F681);
  c = _hh(c, d, a, b, block[11], _S.S33, 0x6D9D6122);
  b = _hh(b, c, d, a, block[14], _S.S34, 0xFDE5380C);

  // 3-2
  a = _hh(a, b, c, d, block[1], _S.S31, 0xA4BEEA44);
  d = _hh(d, a, b, c, block[4], _S.S32, 0x4BDECFA9);
  c = _hh(c, d, a, b, block[7], _S.S33, 0xF6BB4B60);
  b = _hh(b, c, d, a, block[10], _S.S34, 0xBEBFBC70);

  // 3-3
  a = _hh(a, b, c, d, block[13], _S.S31, 0x289B7EC6);
  d = _hh(d, a, b, c, block[0], _S.S32, 0xEAA127FA);
  c = _hh(c, d, a, b, block[3], _S.S33, 0xD4EF3085);
  b = _hh(b, c, d, a, block[6], _S.S34, 0x04881D05);

  // 3-4
  a = _hh(a, b, c, d, block[9], _S.S31, 0xD9D4D039);
  d = _hh(d, a, b, c, block[12], _S.S32, 0xE6DB99E5);
  c = _hh(c, d, a, b, block[15], _S.S33, 0x1FA27CF8);
  b = _hh(b, c, d, a, block[2], _S.S34, 0xC4AC5665);

  // 4

  // 4-1
  a = _ii(a, b, c, d, block[0], _S.S41, 0xF4292244);
  d = _ii(d, a, b, c, block[7], _S.S42, 0x432AFF97);
  c = _ii(c, d, a, b, block[14], _S.S43, 0xAB9423A7);
  b = _ii(b, c, d, a, block[5], _S.S44, 0xFC93A039);

  // 4-2
  a = _ii(a, b, c, d, block[12], _S.S41, 0x655B59C3);
  d = _ii(d, a, b, c, block[3], _S.S42, 0x8F0CCC92);
  c = _ii(c, d, a, b, block[10], _S.S43, 0xFFEFF47D);
  b = _ii(b, c, d, a, block[1], _S.S44, 0x85845DD1);

  // 4-3
  a = _ii(a, b, c, d, block[8], _S.S41, 0x6FA87E4F);
  d = _ii(d, a, b, c, block[15], _S.S42, 0xFE2CE6E0);
  c = _ii(c, d, a, b, block[6], _S.S43, 0xA3014314);
  b = _ii(b, c, d, a, block[13], _S.S44, 0x4E0811A1);

  // 4-4
  a = _ii(a, b, c, d, block[4], _S.S41, 0xF7537E82);
  d = _ii(d, a, b, c, block[11], _S.S42, 0xBD3AF235);
  c = _ii(c, d, a, b, block[2], _S.S43, 0x2AD7D2BB);
  b = _ii(b, c, d, a, block[9], _S.S44, 0xEB86D391);

  contextState[0] = Uint32.truncateFromSafeInteger(contextState[0] + a);
  contextState[1] = Uint32.truncateFromSafeInteger(contextState[1] + b);
  contextState[2] = Uint32.truncateFromSafeInteger(contextState[2] + c);
  contextState[3] = Uint32.truncateFromSafeInteger(contextState[3] + d);
  return;
}

export namespace Md5 {
  //XXX inputのサイズを制限すべき
  export function compute(input: BufferSource): ArrayBuffer {
    const sourceBuffer = ArrayBuffer.isView(input) ? input.buffer : input;
    const sourceByteCount = sourceBuffer.byteLength;

    const paddedByteCount =
      (Math.trunc((sourceByteCount + _DATA_SIZE_BYTES) / _BLOCK_BYTES) +
        1) * _BLOCK_BYTES;
    const paddedBuffer = new ArrayBuffer(paddedByteCount);
    new Uint8Array(paddedBuffer).set(new Uint8Array(sourceBuffer));
    const paddedBufferView = new DataView(paddedBuffer);

    paddedBufferView.setUint8(sourceByteCount, 0x80);

    const sourceBitCount = sourceByteCount * _BITS_PER_BYTE;
    paddedBufferView.setUint32(
      paddedByteCount - _DATA_SIZE_BYTES,
      sourceBitCount,
      true,
    );

    const contextState = _initContextState();
    let byteOffset = 0;
    while (byteOffset < paddedByteCount) {
      _updateContextState(paddedBuffer, byteOffset, contextState);
      byteOffset = byteOffset + _BLOCK_BYTES;
    }

    return BufferUtils.fromUint32Iterable(
      contextState,
      ByteOrder.LITTLE_ENDIAN,
    );
  }
}
