"use client"

import { useState } from "react"
import { PianoDisplay } from "./PianoDisplay"
import { NOTES, Note, ROMAN_NUMERALS, SCALE } from "./constants"

enum Mode {
  Ionian = 0, // Major
  Dorian = 1, // Minor with a major 6th
  Phrygian = 2, // Minor with a flat 2nd
  Lydian = 3, // Major with a sharp 4th
  Mixolydian = 4, // Major with a flat 7th
  Aeolian = 5, // Minor
  Locrian = 6, // Minor with a flat 2nd and flat 5th
}

const getScale = (rootIndex: number, mode = 0) => {
  const scale = SCALE.reduce(
    (acc, step, index) => {
      const prevNoteIndex = acc[index]
      const nextNoteIndex = (prevNoteIndex + step) % NOTES.length
      acc.push(nextNoteIndex)

      return acc
    },
    [rootIndex % NOTES.length],
  )

  const normalizedMode = mode % NOTES.length
  return scale.slice(normalizedMode).concat(scale.slice(0, normalizedMode))
}

const getNoteDisplay = (noteIndex: number) => {
  return NOTES[noteIndex].join("/")
}

const getChord = (scale: number[], degree = 0) => {
  return {
    root: scale[degree % scale.length],
    _3rd: scale[(degree + 2) % scale.length],
    _5th: scale[(degree + 4) % scale.length],
    _7th: scale[(degree + 6) % scale.length],
    _9th: scale[(degree + 8) % scale.length],
    _11th: scale[(degree + 10) % scale.length],
    _13th: scale[(degree + 12) % scale.length],
  }
}

export default function Home() {
  const [rootNote, setRootNote] = useState(Note.C)
  const mode = Mode.Ionian
  const scale = getScale(rootNote, mode)

  return (
    <div className="mx-auto w-full h-screen flex justify-center items-center flex-col gap-4">
      <select
        className="p-2 rounded-md border border-gray-200"
        value={rootNote}
        onChange={(e) => setRootNote(Number(e.target.value))}
      >
        {NOTES.map((note, index) => {
          return (
            <option key={note.join("/")} value={index}>
              {note.join("/")}
            </option>
          )
        })}
      </select>
      <PianoDisplay
        className="w-56"
        activeNotes={scale.map((note) => ({
          note,
        }))}
        noteOffset={0}
        octaves={3}
      />
      <div className="text-2xl font-bold grid grid-cols-3 gap-4">
        {scale.map((note, index) => {
          const noteDisplay = getNoteDisplay(note)
          const chord = getChord(scale, index)
          const triad = [chord.root, chord._3rd, chord._5th].map(getNoteDisplay)
          const extensions = [
            chord._7th,
            chord._9th,
            chord._11th,
            chord._13th,
          ].map(getNoteDisplay)

          return (
            <p
              key={noteDisplay + index}
              className="p-4 bg-gray-100 rounded-md border border-gray-200"
            >
              {noteDisplay}{" "}
              <span className="text-sm text-gray-600">
                {ROMAN_NUMERALS[index]}
              </span>
              <span className="text-sm block text-gray-600">
                {triad.join(" + ")}
              </span>
              <span className="text-sm block text-gray-600">
                {extensions.join(" + ")}
              </span>
              <PianoDisplay
                className="w-56"
                activeNotes={[
                  ...[chord.root, chord._3rd, chord._5th].map((note) => ({
                    note,
                    octaves: note < chord.root ? [1] : [0],
                  })),
                  {
                    note: chord._7th,
                    octaves: chord._7th < chord.root ? [1] : [0],
                    className: "fill-current text-green-500",
                  },
                  ...[chord._9th, chord._11th, chord._13th].map((note) => ({
                    note,
                    octaves: note < chord.root ? [2] : [1],
                    className: "fill-current text-blue-500",
                  })),
                ]}
                noteOffset={0}
                octaves={3}
              />
            </p>
          )
        })}
      </div>
    </div>
  )
}
