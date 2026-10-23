export const CANVAS = { width: 1186, height: 732 }

const CARD_WIDTH = 177.33
const CARD_GAP = 24
const LINE_LEAD = 54.43
const LINE_TAIL = 91.33
const RISER = 31.57
const FINAL_PLATEAU = 55.26
const PLATEAU_RATIO = 0.5926
const BASE_Y = 555.26
const FIRST_Y = 525.98
const TOP_Y = 57.5
const FIRST_BOTTOM = 162.87
const LAST_BOTTOM = 415.87
export const VISIBLE_MILESTONES = 5
const GRADIENT_OVERHANG = 52.3
const GRADIENT_END_Y = 257.18
const PAN_LEAD = 110
const PAN_SPAN = 200
const OPACITY_RAMP = 1.5
const DRAW_SECONDS_PER_SEGMENT = 1.5
const HOLD_SECONDS = 1.5
const RESET_SECONDS = 1.2
const FADE_SHARE = 0.4

export const ORBIT_RADIUS = 32.8

export const ARROW_SHAPE = [
  [10.17, -1.87],
  [2.26, -7.72],
  [3.84, 6.92],
] as const

const round = (value: number) => Math.round(value * 100) / 100

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const smoothstep = (u: number) => u * u * (3 - 2 * u)

const degrees = (radians: number) => (radians * 180) / Math.PI

export type OrbitNode = { x: number; y: number; angle: number }

export const orbitNodes = (count: number, radius = ORBIT_RADIUS): OrbitNode[] =>
  Array.from({ length: count }, (_, index) => {
    const angle = -90 + (360 / count) * index
    const radians = (angle * Math.PI) / 180
    return {
      x: round(50 + radius * Math.cos(radians)),
      y: round(50 + radius * Math.sin(radians)),
      angle,
    }
  })

const cardRow = (count: number) => {
  const total = count * CARD_WIDTH + (count - 1) * CARD_GAP
  const start = (CANVAS.width - total) / 2
  return { start, end: start + total }
}

const CARD_STEP = CARD_WIDTH + CARD_GAP
const CARD_RISE = (LAST_BOTTOM - FIRST_BOTTOM) / (VISIBLE_MILESTONES - 1)

export type StepSlot = { left: number; width: number; bottom: number }

export const stepSlots = (count: number): StepSlot[] => {
  const design = Math.min(count, VISIBLE_MILESTONES)
  const { start } = cardRow(design)
  const rise = design > 1 ? (LAST_BOTTOM - FIRST_BOTTOM) / (design - 1) : 0
  return Array.from({ length: count }, (_, index) => ({
    left: round(((start + index * CARD_STEP) / CANVAS.width) * 100),
    width: round((CARD_WIDTH / CANVAS.width) * 100),
    bottom: round(((FIRST_BOTTOM + index * rise) / CANVAS.height) * 100),
  }))
}

const layout = (count: number) => {
  const design = clamp(count, 1, VISIBLE_MILESTONES)
  const { start, end } = cardRow(design)
  const lineStart = start - LINE_LEAD
  const segmentStart = lineStart + RISER
  const designEnd = end + LINE_TAIL
  const segment = (designEnd - lineStart - RISER - FINAL_PLATEAU) / design
  const plateau = segment * PLATEAU_RATIO
  const steps = Math.max(0, count - VISIBLE_MILESTONES)
  return {
    lineStart,
    segmentStart,
    segment,
    plateau,
    curve: segment - plateau,
    rise: (FIRST_Y - TOP_Y) / design,
    lineEnd: steps > 0 ? segmentStart + count * segment + FINAL_PLATEAU : designEnd,
    steps,
  }
}

type Point = [number, number]

export type PathPiece =
  { kind: 'line'; from: Point; to: Point } | { kind: 'cubic'; points: [Point, Point, Point, Point] }

export const growthPieces = (count: number): PathPiece[] => {
  if (count < 1) return []

  const { lineStart, segmentStart, plateau, curve, rise, lineEnd } = layout(count)
  let x = segmentStart
  let y = FIRST_Y
  const pieces: PathPiece[] = [{ kind: 'line', from: [lineStart, BASE_Y], to: [x, y] }]
  for (let index = 0; index < count; index += 1) {
    const curveStart = x + plateau
    const nextY = y - rise
    pieces.push(
      { kind: 'line', from: [x, y], to: [curveStart, y] },
      {
        kind: 'cubic',
        points: [
          [curveStart, y],
          [curveStart + curve * 0.3636, y],
          [curveStart + curve * 0.6364, y - rise * 0.5713],
          [curveStart + curve, nextY],
        ],
      },
    )
    x = curveStart + curve
    y = nextY
  }
  pieces.push({ kind: 'line', from: [x, y], to: [lineEnd, y] })
  return pieces
}

const pieceStart = (piece: PathPiece) => (piece.kind === 'line' ? piece.from : piece.points[0])

const pieceEnd = (piece: PathPiece) => (piece.kind === 'line' ? piece.to : piece.points[3])

const formatPoint = ([x, y]: Point) => `${round(x)} ${round(y)}`

const formatPiece = (piece: PathPiece) => {
  if (piece.kind === 'cubic') return `C${piece.points.slice(1).map(formatPoint).join(' ')}`
  if (piece.from[1] === piece.to[1]) return `H${round(piece.to[0])}`
  return `L${formatPoint(piece.to)}`
}

const formatPath = (pieces: PathPiece[]) =>
  pieces.length
    ? [`M${formatPoint(pieceStart(pieces[0]))}`, ...pieces.map(formatPiece)].join(' ')
    : ''

export type GrowthPath = {
  d: string
  gradient: { x1: number; y1: number; x2: number; y2: number }
}

export const growthPath = (count: number): GrowthPath => {
  if (count < 1) {
    return { d: '', gradient: { x1: 0, y1: BASE_Y, x2: 0, y2: GRADIENT_END_Y } }
  }

  const { lineStart, lineEnd } = layout(count)
  return {
    d: formatPath(growthPieces(count)),
    gradient: {
      x1: round(lineStart),
      y1: BASE_Y,
      x2: round(lineEnd + GRADIENT_OVERHANG),
      y2: GRADIENT_END_Y,
    },
  }
}

export type LinePoint = { x: number; y: number; angle: number }

const cubicAt = ([p0, p1, p2, p3]: number[], t: number) => {
  const s = 1 - t
  return s * s * s * p0 + 3 * s * s * t * p1 + 3 * s * t * t * p2 + t * t * t * p3
}

const cubicSlope = ([p0, p1, p2, p3]: number[], t: number) => {
  const s = 1 - t
  return 3 * s * s * (p1 - p0) + 6 * s * t * (p2 - p1) + 3 * t * t * (p3 - p2)
}

const solveCubicT = (xs: number[], x: number) => {
  let low = 0
  let high = 1
  let t = 0.5
  for (let iteration = 0; iteration < 64; iteration += 1) {
    t = (low + high) / 2
    const value = cubicAt(xs, t)
    if (Math.abs(value - x) < 1e-4) return t
    if (value < x) low = t
    else high = t
  }
  return t
}

export const pointAtX = (pieces: PathPiece[], x: number): LinePoint => {
  if (!pieces.length) return { x: 0, y: 0, angle: 0 }

  const last = pieces[pieces.length - 1]
  const target = clamp(x, pieceStart(pieces[0])[0], pieceEnd(last)[0])
  const piece = pieces.find((item) => pieceEnd(item)[0] >= target) ?? last
  if (piece.kind === 'line') {
    const [x0, y0] = piece.from
    const [x1, y1] = piece.to
    const t = x1 === x0 ? 0 : (target - x0) / (x1 - x0)
    return { x: target, y: y0 + t * (y1 - y0), angle: degrees(Math.atan2(y1 - y0, x1 - x0)) }
  }

  const xs = piece.points.map(([pointX]) => pointX)
  const ys = piece.points.map(([, pointY]) => pointY)
  const t = solveCubicT(xs, target)
  return {
    x: cubicAt(xs, t),
    y: cubicAt(ys, t),
    angle: degrees(Math.atan2(cubicSlope(ys, t), cubicSlope(xs, t))),
  }
}

export const timelinePan = (count: number) => {
  const { segment, rise, steps } = layout(count)
  if (steps === 0) return { line: { x: 0, y: 0 }, cards: { x: 0, y: 0 } }

  return {
    line: {
      x: ((-steps * segment) / CANVAS.width) * 100,
      y: ((steps * rise) / CANVAS.height) * 100,
    },
    cards: {
      x: ((-steps * CARD_STEP) / CANVAS.width) * 100,
      y: ((steps * CARD_RISE) / CANVAS.height) * 100,
    },
  }
}

export const panAt = (headX: number, count: number) => {
  const { segmentStart, segment, steps } = layout(count)
  let pan = 0
  for (let index = 0; index < steps; index += 1) {
    const start = segmentStart + (VISIBLE_MILESTONES + index) * segment - PAN_LEAD
    pan += smoothstep(clamp((headX - start) / PAN_SPAN, 0, 1))
  }
  return pan
}

export const windowOpacity = (index: number, pan: number) =>
  clamp(OPACITY_RAMP * Math.min(index - pan + 1, pan + VISIBLE_MILESTONES - index), 0, 1)

export type TimelineTiming = { draw: number; hold: number; reset: number; loop: number }

export const timelineTiming = (count: number): TimelineTiming => {
  if (count < 1) return { draw: 0, hold: 0, reset: 0, loop: 0 }

  const { lineStart, lineEnd, segment } = layout(count)
  const draw = ((lineEnd - lineStart) / segment) * DRAW_SECONDS_PER_SEGMENT
  return {
    draw,
    hold: HOLD_SECONDS,
    reset: RESET_SECONDS,
    loop: draw + HOLD_SECONDS + RESET_SECONDS,
  }
}

export type TimelineFrame = {
  headX: number
  head: LinePoint
  pan: number
  opacity: number
  arrow: boolean
  active: number
}

const emptyFrame = (): TimelineFrame => ({
  headX: 0,
  head: { x: 0, y: 0, angle: 0 },
  pan: 0,
  opacity: 0,
  arrow: false,
  active: -1,
})

const framePieces = new Map<number, PathPiece[]>()

const piecesFor = (count: number) => {
  const cached = framePieces.get(count)
  if (cached) return cached
  const pieces = growthPieces(count)
  framePieces.set(count, pieces)
  return pieces
}

const frameAt = (
  count: number,
  headX: number,
  state: Omit<TimelineFrame, 'headX' | 'head'>,
): TimelineFrame => ({ headX, head: pointAtX(piecesFor(count), headX), ...state })

export const timelineFrame = (count: number, time: number): TimelineFrame => {
  if (count < 1) return emptyFrame()

  const { lineStart, segmentStart, segment, lineEnd, steps } = layout(count)
  const { draw, hold, reset, loop } = timelineTiming(count)
  const t = Math.max(time, 0) % loop
  if (t < draw) {
    const headX = lineStart + (t / draw) * (lineEnd - lineStart)
    return frameAt(count, headX, {
      pan: panAt(headX, count),
      opacity: 1,
      arrow: true,
      active: clamp(Math.floor((headX - segmentStart) / segment), 0, count - 1),
    })
  }
  if (t < draw + hold) {
    return frameAt(count, lineEnd, { pan: steps, opacity: 1, arrow: true, active: count - 1 })
  }

  const u = clamp((t - draw - hold) / reset, 0, 1)
  return frameAt(count, lineEnd, {
    pan: steps * (1 - smoothstep(u)),
    opacity: 1 - clamp(u / FADE_SHARE, 0, 1),
    arrow: true,
    active: -1,
  })
}

export const staticFrame = (count: number): TimelineFrame => {
  if (count < 1) return emptyFrame()

  const { lineEnd } = layout(Math.min(count, VISIBLE_MILESTONES))
  return frameAt(count, lineEnd, { pan: 0, opacity: 1, arrow: true, active: -1 })
}

export const idleFrame = (count: number): TimelineFrame => {
  if (count < 1) return emptyFrame()

  return frameAt(count, layout(count).lineStart, { pan: 0, opacity: 1, arrow: false, active: -1 })
}
