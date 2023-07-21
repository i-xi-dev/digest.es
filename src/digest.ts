import { _crypto } from "../deps.ts";
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
    compute: (input: Uint8Array) => Promise<Uint8Array>;
  }

  /**
   * SHA-256 digest algorithm
   */
  export const Sha256: Algorithm = Object.freeze({
    /**
     * Computes the SHA-256 digest for the byte sequence.
     */
    async compute(input: Uint8Array): Promise<Uint8Array> {
      const bytes = await _subtle.digest("SHA-256", input);
      return new Uint8Array(bytes);
    },
  });

  /**
   * SHA-384 digest algorithm
   */
  export const Sha384: Algorithm = Object.freeze({
    /**
     * Computes the SHA-384 digest for the byte sequence.
     */
    async compute(input: Uint8Array): Promise<Uint8Array> {
      const bytes = await _subtle.digest("SHA-384", input);
      return new Uint8Array(bytes);
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
    async compute(input: Uint8Array): Promise<Uint8Array> {
      const bytes = await _subtle.digest("SHA-512", input);
      return new Uint8Array(bytes);
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
    async compute(input: Uint8Array): Promise<Uint8Array> {
      const bytes = await _subtle.digest("SHA-1", input);
      return new Uint8Array(bytes);
    },
  });

  //   /**
  //    * MD5 digest algorithm
  //    *
  //    * @deprecated
  //    */
  //   export const Md5: Algorithm = Object.freeze({
  //     /**
  //      * Computes the MD5 digest for the byte sequence.
  //      */
  //     async compute(input: Uint8Array): Promise<Uint8Array> {
  // TODO
  //     },
  //   });
}
Object.freeze(Digest);

export { Digest };
