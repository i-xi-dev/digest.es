import { _crypto } from "../deps.ts";
import { Md5 as _md5 } from "./md5.ts";

//const _subtle: SubtleCrypto = globalThis.crypto.subtle;
const _subtle: SubtleCrypto = _crypto.subtle;

namespace Digest {
  /**
   * Digest algorithm
   */
  export interface Algorithm {
    /**
     * Computes the digest for the byte sequence.
     *
     * @param input The input to compute the digest.
     * @returns The `Promise` that fulfills with a computed digest.
     */
    compute: (input: BufferSource) => Promise<ArrayBuffer>;
  }

  /**
   * SHA-256 digest algorithm
   */
  export const Sha256: Algorithm = Object.freeze({
    /**
     * Computes the SHA-256 digest for the byte sequence.
     */
    compute(input: BufferSource): Promise<ArrayBuffer> {
      return _subtle.digest("SHA-256", input);
    },
  });

  /**
   * SHA-384 digest algorithm
   */
  export const Sha384: Algorithm = Object.freeze({
    /**
     * Computes the SHA-384 digest for the byte sequence.
     */
    compute(input: BufferSource): Promise<ArrayBuffer> {
      return _subtle.digest("SHA-384", input);
    },
  });

  /**
   * SHA-512 digest algorithm
   */
  export const Sha512: Algorithm = Object.freeze({
    /**
     * Computes the SHA-512 digest for the byte sequence.
     *
     * @see {@link Algorithm.compute}
     */
    compute(input: BufferSource): Promise<ArrayBuffer> {
      return _subtle.digest("SHA-512", input);
    },
  });

  /**
   * SHA-1 digest algorithm
   *
   * @deprecated
   */
  export const Sha1: Algorithm = Object.freeze({
    /**
     * Computes the SHA-1 digest for the byte sequence.
     */
    compute(input: BufferSource): Promise<ArrayBuffer> {
      return _subtle.digest("SHA-1", input);
    },
  });

  /**
   * MD5 digest algorithm
   *
   * @deprecated
   */
  export const Md5: Algorithm = Object.freeze({
    /**
     * Computes the MD5 digest for the byte sequence.
     */
    compute(input: BufferSource): Promise<ArrayBuffer> {
      return new Promise((resolve, reject) => {
        try {
          const result = _md5.compute(input);
          resolve(result);
        } catch (exception) {
          reject(exception);
        }
      });
    },
  });
}
Object.freeze(Digest);

export { Digest };
