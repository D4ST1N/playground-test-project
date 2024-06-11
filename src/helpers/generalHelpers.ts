import { GameSoundMapping, HexCode } from "@/helpers/generalTypes";

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

export function formatTime(time: number): string {
  return `${Math.floor(time / 60)}:${(time % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}`;
}

export function capitalizeString(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class GameSound {
  audio: HTMLAudioElement;

  constructor(
    public key: string,
    private sound: string,
    loop: boolean = false,
    volume: number = 1,
  ) {
    this.audio = new Audio(sound);
    this.audio.loop = loop;
    this.audio.volume = volume;
  }

  play() {
    this.audio.play();
  }

  changeVolume(volume: number) {
    this.audio.volume = volume;
  }

  playMultiple(volume?: number) {
    const audio = new Audio(this.sound);
    audio.volume = volume ? volume : this.audio.volume;
    audio.play();
  }

  pause() {
    this.audio.pause();
  }
}

export function soundFabric(soundMappings: GameSoundMapping[]) {
  return soundMappings.reduce((acc: Record<string, GameSound>, soundMapping) => {
    acc[soundMapping.key] = new GameSound(
      soundMapping.key,
      soundMapping.sound,
      soundMapping.loop,
      soundMapping.volume,
    );
    return acc;
  }, {});
}

export function getAssetUrl(url: string): string {
  const assetUrl = new URL(url, import.meta.url);
  // FIXME: temporary fix for github pages for assets paths
  return import.meta.env.PROD ? `${assetUrl.origin}${import.meta.env.BASE_URL}${assetUrl.pathname}` : assetUrl.href;
}
