function generateStr(characters: string, length: number) {
  let str = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    str += characters.charAt(randomIndex);
  }

  return str;
}
export function generateTrackNumber() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const trackNumberLength = 10;

  return generateStr(characters, trackNumberLength);
}
export function generateId() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const trackNumberLength = 8;

  return generateStr(characters, trackNumberLength);
}
