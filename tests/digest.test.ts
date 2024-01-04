import { assertStrictEquals } from "./deps.ts";
import { Digest } from "../mod.ts";

function _x(arrayBuffer: ArrayBuffer): string {
  return [...new Uint8Array(arrayBuffer)].map((b) =>
    b.toString(16).toUpperCase().padStart(2, "0")
  ).join("");
}

Deno.test("Digest.Sha256.compute(Uint8Array)", async () => {
  const s1 = await Digest.Sha256.compute(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
  );
});

Deno.test("Digest.Sha384.compute(Uint8Array)", async () => {
  const s1 = await Digest.Sha384.compute(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "38B060A751AC96384CD9327EB1B1E36A21FDB71114BE07434C0CC7BF63F6E1DA274EDEBFE76F65FBD51AD2F14898B95B",
  );
});

Deno.test("Digest.Sha512.compute(Uint8Array)", async () => {
  const s1 = await Digest.Sha512.compute(Uint8Array.of());
  assertStrictEquals(
    _x(s1),
    "CF83E1357EEFB8BDF1542850D66D8007D620E4050B5715DC83F4A921D36CE9CE47D0D13C5D85F2B0FF8318D2877EEC2F63B931BD47417A81A538327AF927DA3E",
  );
});

Deno.test("Digest.Sha1.compute(Uint8Array)", async () => {
  const s1 = await Digest.Sha1.compute(Uint8Array.of());
  assertStrictEquals(_x(s1), "DA39A3EE5E6B4B0D3255BFEF95601890AFD80709");
});

Deno.test("Digest.Md5.compute(Uint8Array)", async () => {
  const s0 = await Digest.Md5.compute(new Uint8Array(0));
  assertStrictEquals(_x(s0), "D41D8CD98F00B204E9800998ECF8427E");

  const s1 = await Digest.Md5.compute(new Uint8Array(1));
  assertStrictEquals(_x(s1), "93B885ADFE0DA089CDF634904FD59F71");

  const s2 = await Digest.Md5.compute(new Uint8Array(2));
  assertStrictEquals(_x(s2), "C4103F122D27677C9DB144CAE1394A66");

  const s3 = await Digest.Md5.compute(new Uint8Array(3));
  assertStrictEquals(_x(s3), "693E9AF84D3DFCC71E640E005BDC5E2E");

  const s4 = await Digest.Md5.compute(new Uint8Array(4));
  assertStrictEquals(_x(s4), "F1D3FF8443297732862DF21DC4E57262");

  const s5 = await Digest.Md5.compute(new Uint8Array(5));
  assertStrictEquals(_x(s5), "CA9C491AC66B2C62500882E93F3719A8");

  const s6 = await Digest.Md5.compute(new Uint8Array(6));
  assertStrictEquals(_x(s6), "7319468847D7B1AEE40DBF5DD963C999");

  const s55 = await Digest.Md5.compute(new Uint8Array(55));
  assertStrictEquals(_x(s55), "C9EA3314B91C9FD4E38F9432064FD1F2");

  const s56 = await Digest.Md5.compute(new Uint8Array(56));
  assertStrictEquals(_x(s56), "E3C4DD21A9171FD39D208EFA09BF7883");

  const s119 = await Digest.Md5.compute(new Uint8Array(119));
  assertStrictEquals(_x(s119), "8271CB2E6A546123B43096A2EFCE39D2");

  const s120 = await Digest.Md5.compute(new Uint8Array(120));
  assertStrictEquals(_x(s120), "222F7D881DED1871724A1B9A1CB94247");
});
