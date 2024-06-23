import { NATURAL_NOTES, NOTES, Note } from "./constants"

type ActiveNote =
  | number
  | { note: number; octaves?: number[]; className?: string }

type PianoDisplayProps = {
  yOffset?: number
  keyWidth?: number
  keyHeight?: number
  blackKeyWidth?: number
  blackKeyHeight?: number
  noteOffset?: number
  octaves?: number
  showLastBlackKey?: boolean
  showLastWhiteKey?: boolean
  activeNotes?: ActiveNote[]
  activeNoteClass?: string
  className?: string
}

const getActiveNote = (
  activeNotes: ActiveNote[],
  note: number,
  octaveIndex?: number,
) => {
  return activeNotes.find((activeNote) => {
    if (typeof activeNote === "number") {
      return activeNote === note
    }

    return (
      activeNote.note === note &&
      (typeof octaveIndex === "undefined" ||
        !activeNote.octaves ||
        activeNote.octaves.includes(octaveIndex))
    )
  })
}

const getActiveNoteClass = (
  activeNote: ActiveNote | undefined,
  fallback?: string,
) => {
  if (!activeNote) {
    return ""
  }

  if (typeof activeNote === "number") {
    return fallback || ""
  }

  return activeNote.className || fallback || ""
}

export const PianoDisplay = ({
  yOffset = 0,
  keyWidth = 12,
  keyHeight = 80,
  blackKeyWidth = keyWidth / 2,
  blackKeyHeight = 50,
  noteOffset = 0,
  octaves = 2,
  showLastBlackKey = false,
  showLastWhiteKey = true,
  activeNotes = [],
  activeNoteClass = "fill-current text-red-500",
  className = "",
}: PianoDisplayProps) => {
  const totalNaturalNotes =
    NATURAL_NOTES.length * octaves + (showLastWhiteKey ? 1 : 0)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${totalNaturalNotes * keyWidth} ${keyHeight}`}
      className={className}
    >
      {Array.from({ length: octaves + (showLastWhiteKey ? 1 : 0) }).map(
        (_, octaveIndex) => {
          return (
            <>
              {Array.from({
                length: octaveIndex === octaves ? 1 : NATURAL_NOTES.length,
              }).map((_, index) => {
                const naturalNote =
                  NATURAL_NOTES[(index + noteOffset) % NATURAL_NOTES.length]
                const keyIndex = index + octaveIndex * NATURAL_NOTES.length
                const x = keyIndex * keyWidth
                const activeNote = getActiveNote(
                  activeNotes,
                  naturalNote,
                  octaveIndex,
                )

                return (
                  <rect
                    key={naturalNote}
                    x={x}
                    y={yOffset}
                    width={keyWidth}
                    height={keyHeight}
                    fill="white"
                    stroke="black"
                    strokeWidth={1}
                    className={getActiveNoteClass(activeNote, activeNoteClass)}
                  />
                )
              })}
            </>
          )
        },
      )}
      {Array.from({ length: octaves }).map((_, octaveIndex) => {
        return (
          <>
            {Array.from({ length: NATURAL_NOTES.length }).map((_, index) => {
              const naturalNote =
                NATURAL_NOTES[(index + noteOffset) % NATURAL_NOTES.length]
              const keyIndex = index + octaveIndex * NATURAL_NOTES.length
              const hasBlackKey = [
                Note.C,
                Note.D,
                Note.F,
                Note.G,
                Note.A,
              ].includes(naturalNote)

              if (
                !hasBlackKey ||
                (index === totalNaturalNotes - 1 && !showLastBlackKey)
              ) {
                return null
              }

              const x = keyIndex * keyWidth + keyWidth - blackKeyWidth / 2
              const activeNote = getActiveNote(
                activeNotes,
                (naturalNote + 1) % NOTES.length,
                octaveIndex,
              )

              return (
                <rect
                  key={naturalNote}
                  x={x}
                  y={yOffset}
                  width={blackKeyWidth}
                  height={blackKeyHeight}
                  fill="black"
                  stroke="black"
                  strokeWidth={1}
                  className={getActiveNoteClass(activeNote, activeNoteClass)}
                />
              )
            })}
          </>
        )
      })}
    </svg>
  )
}
