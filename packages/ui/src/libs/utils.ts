export const currentPicrewId = () => import.meta.env.DEV
  ? "123456"
  : location.pathname.match(/\d+$/)![0];

export const hashObject = (object: any): string => {
  // cyrb53
  const str = JSON.stringify(object);
  const seed = 53;
  return cyrb53(str, seed).toString(36);
}

const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xDEADBEEF ^ seed;
  let h2 = 0x41C6CE57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}