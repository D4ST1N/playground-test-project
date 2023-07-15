import { HexCode } from "./generalTypes";

export function brightenColor(color: HexCode, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  var RR = R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
  var GG = G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
  var BB = B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

  return `#${RR}${GG}${BB}`;
}

export function timeout(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function randomInteger(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumbersInRange(
  min: number = 0,
  max: number = 100,
  count: number = 10,
  reservedNumbers: number[] = [],
): number[] {
  const generatedNumbers: number[] = [];
  const numbers = Array(max - min + 1)
    .fill(null)
    .map((_: null, index: number) => min + index)
    .filter((n) => !reservedNumbers.includes(n));

  while (generatedNumbers.length < count) {
    const generatedIndex = randomInteger(0, numbers.length - 1);
    generatedNumbers.push(numbers[generatedIndex]);
    numbers.splice(generatedIndex, 1);
  }

  return generatedNumbers;
}
