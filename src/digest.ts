import { _crypto } from "../deps.ts";

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
      const bytes = await _crypto.subtle.digest("SHA-256", input);
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
      const bytes = await _crypto.subtle.digest("SHA-384", input);
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
      const bytes = await _crypto.subtle.digest("SHA-512", input);
      return new Uint8Array(bytes);
    },
  });
}
Object.freeze(Digest);

export { Digest };
