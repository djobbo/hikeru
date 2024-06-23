const STEP = 2
const HALF_STEP = 1

export const SCALE = [STEP, STEP, HALF_STEP, STEP, STEP, STEP]

export const NOTES = [
  ["A"],
  ["A#", "Bb"],
  ["B"],
  ["C"],
  ["C#", "Db"],
  ["D"],
  ["D#", "Eb"],
  ["E"],
  ["F"],
  ["F#", "Gb"],
  ["G"],
  ["G#", "Ab"],
]

export const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"]

export enum Note {
  A = 0,
  "A#" = 1,
  Bb = 1,
  B = 2,
  C = 3,
  "C#" = 4,
  Db = 4,
  D = 5,
  "D#" = 6,
  Eb = 6,
  E = 7,
  F = 8,
  "F#" = 9,
  Gb = 9,
  G = 10,
  "G#" = 11,
  Ab = 11,
}

export const NATURAL_NOTES = [
  Note.A,
  Note.B,
  Note.C,
  Note.D,
  Note.E,
  Note.F,
  Note.G,
]
