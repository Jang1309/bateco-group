import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  ARROW_SHAPE,
  CANVAS,
  growthPath,
  growthPieces,
  idleFrame,
  ORBIT_RADIUS,
  orbitNodes,
  panAt,
  pointAtX,
  staticFrame,
  stepSlots,
  timelineFrame,
  timelinePan,
  timelineTiming,
  VISIBLE_MILESTONES,
  windowOpacity,
} from './geometry.ts'

const numbers = (value) => value.match(/-?\d+(\.\d+)?/g).map(Number)

const pathPoints = (d) => {
  const values = numbers(d)
  const points = []
  for (let index = 0; index + 1 < values.length; index += 2) {
    points.push([values[index], values[index + 1]])
  }
  return points
}

const plateauYs = (d) => {
  const ys = [numbers(d.split('L')[1])[1]]
  for (const curve of d.split('C').slice(1)) ys.push(numbers(curve)[5])
  return ys
}

const near = (actual, expected, tolerance, label) =>
  assert.ok(
    Math.abs(actual - expected) < tolerance,
    `${label}: ${actual} is not within ${tolerance} of ${expected}`,
  )

const pieceStart = (piece) => (piece.kind === 'line' ? piece.from : piece.points[0])

const pieceEnd = (piece) => (piece.kind === 'line' ? piece.to : piece.points[3])

const lineLayout = (count) => {
  const pieces = growthPieces(count)
  const segmentStart = pieces[0].to[0]
  return {
    pieces,
    lineStart: pieces[0].from[0],
    segmentStart,
    segment: pieces[3].from[0] - segmentStart,
    lineEnd: pieces.at(-1).to[0],
  }
}

const arrowTip = (frame, count) => {
  const pan = timelinePan(count).line
  const share = frame.pan / Math.max(count - VISIBLE_MILESTONES, 1)
  return [
    frame.head.x + ARROW_SHAPE[0][0] + share * (pan.x / 100) * CANVAS.width,
    frame.head.y + ARROW_SHAPE[0][1] + share * (pan.y / 100) * CANVAS.height,
  ]
}

const GOLDEN = {
  1: {
    path: {
      d: 'M449.91 555.26 L481.48 525.98 H621.48 C656.48 525.98 682.74 258.34 717.74 57.5 H773',
      gradient: { x1: 449.91, y1: 555.26, x2: 825.3, y2: 257.18 },
    },
    slots: [{ left: 42.52, width: 14.95, bottom: 22.25 }],
  },
  3: {
    path: {
      d: 'M248.58 555.26 L280.15 525.98 H406.35 C437.9 525.98 461.57 436.77 493.12 369.82 H619.33 C650.87 369.82 674.54 280.61 706.09 213.66 H832.3 C863.85 213.66 887.52 124.45 919.07 57.5 H974.33',
      gradient: { x1: 248.58, y1: 555.26, x2: 1026.63, y2: 257.18 },
    },
    slots: [
      { left: 25.55, width: 14.95, bottom: 22.25 },
      { left: 42.52, width: 14.95, bottom: 39.53 },
      { left: 59.5, width: 14.95, bottom: 56.81 },
    ],
  },
  5: {
    path: {
      d: 'M47.24 555.26 L78.81 525.98 H202.26 C233.12 525.98 256.27 472.45 287.13 432.28 H410.58 C441.44 432.28 464.59 378.76 495.45 338.59 H618.9 C649.75 338.59 672.91 285.06 703.76 244.89 H827.21 C858.07 244.89 881.22 191.36 912.08 151.2 H1035.53 C1066.39 151.2 1089.54 97.67 1120.4 57.5 H1175.66',
      gradient: { x1: 47.24, y1: 555.26, x2: 1227.96, y2: 257.18 },
    },
    slots: [
      { left: 8.57, width: 14.95, bottom: 22.25 },
      { left: 25.55, width: 14.95, bottom: 30.89 },
      { left: 42.52, width: 14.95, bottom: 39.53 },
      { left: 59.5, width: 14.95, bottom: 48.17 },
      { left: 76.48, width: 14.95, bottom: 56.81 },
    ],
  },
}

const EMPTY_FRAME = {
  headX: 0,
  head: { x: 0, y: 0, angle: 0 },
  pan: 0,
  opacity: 0,
  arrow: false,
  active: -1,
}

describe('orbitNodes', () => {
  it('returns no nodes for an empty list', () => {
    assert.deepEqual(orbitNodes(0), [])
  })

  it('starts at the top and spaces nodes evenly', () => {
    const nodes = orbitNodes(9)
    assert.equal(nodes.length, 9)
    assert.deepEqual(nodes[0], { x: 50, y: 17.2, angle: -90 })
    nodes.forEach((node, index) => assert.equal(node.angle, -90 + 40 * index))
  })

  it('keeps every node on the orbit radius', () => {
    for (const count of [1, 6, 9]) {
      for (const node of orbitNodes(count)) {
        const distance = Math.hypot(node.x - 50, node.y - 50)
        assert.ok(Math.abs(distance - ORBIT_RADIUS) < 0.02, `distance ${distance} for ${count}`)
      }
    }
  })

  it('matches the Figma satellite centers for nine nodes', () => {
    const figma = [
      [50.0, 17.1],
      [71.1, 24.8],
      [82.4, 44.3],
      [78.5, 66.4],
      [61.2, 80.9],
      [38.8, 80.9],
      [21.5, 66.4],
      [17.6, 44.3],
      [28.9, 24.8],
    ]
    orbitNodes(9).forEach((node, index) => {
      assert.ok(Math.abs(node.x - figma[index][0]) < 0.3, `x of node ${index}`)
      assert.ok(Math.abs(node.y - figma[index][1]) < 0.3, `y of node ${index}`)
    })
  })
})

describe('stepSlots', () => {
  it('matches the Figma card columns for five milestones', () => {
    const figmaLefts = [101.51, 302.84, 504.17, 706.17, 907.17]
    const slots = stepSlots(5)
    assert.equal(slots.length, 5)
    slots.forEach((slot, index) => {
      const left = (slot.left / 100) * CANVAS.width
      const width = (slot.width / 100) * CANVAS.width
      assert.ok(Math.abs(left - figmaLefts[index]) < 1.5, `left of card ${index}`)
      assert.ok(Math.abs(width - 177.33) < 0.5, `width of card ${index}`)
    })
  })

  it('steps every card higher than the previous one', () => {
    for (const count of [3, 5, 7]) {
      const slots = stepSlots(count)
      for (let index = 1; index < slots.length; index += 1) {
        assert.ok(slots[index].bottom > slots[index - 1].bottom)
        assert.ok(slots[index].left > slots[index - 1].left)
      }
    }
  })

  it('keeps every card inside the canvas up to the design count', () => {
    for (const count of [1, 3, 5]) {
      for (const slot of stepSlots(count)) {
        assert.ok(slot.left >= 0)
        assert.ok(slot.left + slot.width <= 100)
        assert.ok(slot.bottom >= 0 && slot.bottom <= 100)
      }
    }
  })

  it('reproduces the v1 slots for up to five milestones', () => {
    for (const count of [1, 3, 5]) assert.deepEqual(stepSlots(count), GOLDEN[count].slots)
  })

  it('keeps the design layout for the first five of more milestones', () => {
    assert.deepEqual(stepSlots(7).slice(0, 5), stepSlots(5))
  })

  it('lines the last five cards up with the design after the full pan', () => {
    const design = stepSlots(5)
    const pan = timelinePan(7).cards
    const slots = stepSlots(7)
    assert.equal(slots.length, 7)
    for (let index = 2; index < 7; index += 1) {
      const target = design[index - 2]
      near(slots[index].left + pan.x, target.left, 0.05, `left of card ${index}`)
      near(slots[index].bottom - pan.y, target.bottom, 0.05, `bottom of card ${index}`)
      assert.equal(slots[index].width, target.width)
    }
  })
})

describe('growthPath', () => {
  it('returns an empty line when there are no milestones', () => {
    assert.deepEqual(stepSlots(0), [])
    assert.deepEqual(growthPath(0), {
      d: '',
      gradient: { x1: 0, y1: 555.26, x2: 0, y2: 257.18 },
    })
  })

  it('reproduces the v1 line and gradient for up to five milestones', () => {
    for (const count of [1, 3, 5]) assert.deepEqual(growthPath(count), GOLDEN[count].path)
  })

  it('spans the gradient over the drawn line', () => {
    const figma = growthPath(5).gradient
    assert.ok(Math.abs(figma.x1 - 47.08) < 1)
    assert.ok(Math.abs(figma.x2 - 1228.13) < 1)
    for (const count of [1, 3, 7]) {
      const { d, gradient } = growthPath(count)
      const start = numbers(d)[0]
      const end = numbers(d.split('H').at(-1))[0]
      assert.equal(gradient.x1, start)
      assert.ok(gradient.x2 > end)
    }
  })

  it('follows the Figma growth line for five milestones', () => {
    const { d } = growthPath(5)
    const points = pathPoints(d.replace(/[MLHC]/g, ' '))
    assert.ok(Math.abs(points[0][0] - 47.08) < 1)
    assert.ok(Math.abs(points[0][1] - 555.26) < 0.01)
    const figmaPlateaus = [525.98, 423.5, 335.66, 233.18, 145.34, 57.5]
    plateauYs(d).forEach((y, index) => {
      assert.ok(Math.abs(y - figmaPlateaus[index]) < 15, `plateau ${index}: ${y}`)
    })
    const last = numbers(d.split('H').at(-1))[0]
    assert.ok(Math.abs(last - 1175.83) < 1)
  })

  it('draws one plateau per milestone plus the final one', () => {
    for (const count of [1, 3, 5, 7]) {
      const { d } = growthPath(count)
      assert.equal((d.match(/H/g) ?? []).length, count + 1)
      assert.equal((d.match(/C/g) ?? []).length, count)
      const ys = plateauYs(d)
      for (let index = 1; index < ys.length; index += 1) assert.ok(ys[index] < ys[index - 1])
    }
  })

  it('keeps the line inside the canvas up to the design count', () => {
    for (const count of [1, 3, 5]) {
      const { d } = growthPath(count)
      for (const value of numbers(d)) {
        assert.ok(value >= 0 && value <= CANVAS.width, `value ${value}`)
      }
      for (const y of plateauYs(d)) assert.ok(y >= 0 && y <= CANVAS.height, `plateau ${y}`)
    }
  })

  it('extends the design line segment by segment for more milestones', () => {
    const prefix = growthPath(5).d.replace(/ H[^ ]+$/, '')
    const { d, gradient } = growthPath(7)
    assert.ok(d.startsWith(`${prefix} `), d)
    assert.equal(numbers(d.split('H').at(-1))[0], 1592.29)
    assert.deepEqual(gradient, { x1: 47.24, y1: 555.26, x2: 1644.59, y2: 257.18 })
  })
})

describe('growthPieces', () => {
  it('returns no pieces when there are no milestones', () => {
    assert.deepEqual(growthPieces(0), [])
  })

  it('chains every piece onto the previous one', () => {
    for (const count of [1, 5, 7]) {
      const pieces = growthPieces(count)
      assert.equal(pieces.length, 2 * count + 2)
      for (let index = 1; index < pieces.length; index += 1) {
        assert.deepEqual(pieceStart(pieces[index]), pieceEnd(pieces[index - 1]))
      }
    }
  })
})

describe('pointAtX', () => {
  const { pieces, lineStart, lineEnd } = lineLayout(5)

  it('returns the origin for an empty line', () => {
    assert.deepEqual(pointAtX([], 10), { x: 0, y: 0, angle: 0 })
  })

  it('starts on the riser at the base of the line', () => {
    const point = pointAtX(pieces, lineStart)
    assert.equal(point.x, lineStart)
    assert.equal(point.y, 555.26)
    near(point.angle, (Math.atan2(-29.28, 31.57) * 180) / Math.PI, 1e-6, 'riser angle')
  })

  it('stays flat on a plateau', () => {
    const point = pointAtX(pieces, 150)
    assert.equal(point.x, 150)
    near(point.y, 525.98, 1e-9, 'plateau y')
    assert.equal(point.angle, 0)
  })

  it('solves a point on a curve', () => {
    const curve = pieces[2]
    assert.equal(curve.kind, 'cubic')
    const [start, , , end] = curve.points
    const target = (start[0] + end[0]) / 2
    const point = pointAtX(pieces, target)
    near(point.x, target, 1e-3, 'curve x')
    assert.ok(point.y < start[1] && point.y > end[1], `curve y ${point.y}`)
    assert.ok(point.angle < 0 && point.angle > -90, `curve angle ${point.angle}`)
  })

  it('clamps beyond both ends of the line', () => {
    assert.deepEqual(pointAtX(pieces, -100), pointAtX(pieces, lineStart))
    const end = pointAtX(pieces, 5000)
    assert.equal(end.x, lineEnd)
    near(end.y, 57.5, 1e-6, 'end y')
    assert.equal(end.angle, 0)
  })
})

describe('timelinePan', () => {
  it('does not pan up to the design count', () => {
    for (const count of [0, 1, 5]) {
      assert.deepEqual(timelinePan(count), { line: { x: 0, y: 0 }, cards: { x: 0, y: 0 } })
    }
  })

  it('pans the line and the cards by the extra milestones', () => {
    const { line, cards } = timelinePan(7)
    near(line.x, -35.13, 0.01, 'line x')
    near(line.y, 25.6, 0.01, 'line y')
    near(cards.x, -33.95, 0.01, 'cards x')
    near(cards.y, 17.28, 0.01, 'cards y')
  })
})

describe('panAt', () => {
  it('stays at zero up to the design count', () => {
    for (const count of [1, 3, 5]) {
      for (let headX = 0; headX <= 1300; headX += 10) assert.equal(panAt(headX, count), 0)
    }
  })

  it('waits until the head passes the fourth milestone', () => {
    const { lineStart, segmentStart, segment, lineEnd } = lineLayout(7)
    for (let headX = lineStart; headX <= lineEnd; headX += 0.5) {
      if (Math.floor((headX - segmentStart) / segment) <= 3) assert.equal(panAt(headX, 7), 0)
    }
  })

  it('reaches every extra step at the end of the line', () => {
    assert.equal(panAt(lineLayout(7).lineEnd, 7), 2)
    assert.equal(panAt(lineLayout(9).lineEnd, 9), 4)
  })

  it('never pans backwards while the head moves forward', () => {
    const { lineStart, lineEnd } = lineLayout(7)
    let previous = 0
    for (let headX = lineStart; headX <= lineEnd; headX += 0.5) {
      const pan = panAt(headX, 7)
      assert.ok(pan >= previous, `pan ${pan} at ${headX}`)
      previous = pan
    }
  })
})

describe('windowOpacity', () => {
  it('shows the first five cards before the pan', () => {
    assert.deepEqual(
      [0, 1, 2, 3, 4, 5, 6].map((index) => windowOpacity(index, 0)),
      [1, 1, 1, 1, 1, 0, 0],
    )
  })

  it('shows the last five cards after the full pan', () => {
    assert.deepEqual(
      [0, 1, 2, 3, 4, 5, 6].map((index) => windowOpacity(index, 2)),
      [0, 0, 1, 1, 1, 1, 1],
    )
  })

  it('stays between zero and one', () => {
    for (let index = 0; index < 7; index += 1) {
      for (let pan = 0; pan <= 2; pan += 0.05) {
        const opacity = windowOpacity(index, pan)
        assert.ok(opacity >= 0 && opacity <= 1, `opacity ${opacity}`)
      }
    }
  })
})

describe('timelineTiming', () => {
  it('returns no time when there are no milestones', () => {
    assert.deepEqual(timelineTiming(0), { draw: 0, hold: 0, reset: 0, loop: 0 })
  })

  it('adds the draw, hold and reset phases into one loop', () => {
    const { draw, hold, reset, loop } = timelineTiming(7)
    assert.equal(hold, 1.5)
    assert.equal(reset, 1.2)
    assert.equal(loop, draw + hold + reset)
    near(loop, 13.825, 1e-3, 'loop')
  })
})

describe('timelineFrame', () => {
  const { draw, hold, reset, loop } = timelineTiming(7)
  const { lineStart } = lineLayout(7)

  it('returns an empty frame when there are no milestones', () => {
    assert.deepEqual(timelineFrame(0, 1), EMPTY_FRAME)
    assert.deepEqual(staticFrame(0), EMPTY_FRAME)
    assert.deepEqual(idleFrame(0), EMPTY_FRAME)
  })

  it('starts at the base of the line on the first milestone', () => {
    const frame = timelineFrame(7, 0)
    assert.equal(frame.headX, lineStart)
    assert.equal(frame.active, 0)
    assert.equal(frame.pan, 0)
    assert.equal(frame.opacity, 1)
    assert.equal(frame.arrow, true)
  })

  it('activates every milestone in order while drawing', () => {
    const actives = []
    for (let time = 0; time < draw; time += 0.01) actives.push(timelineFrame(7, time).active)
    for (let index = 1; index < actives.length; index += 1) {
      assert.ok(actives[index] >= actives[index - 1])
    }
    assert.deepEqual([...new Set(actives)], [0, 1, 2, 3, 4, 5, 6])
  })

  it('holds the arrow at the design corner after the full pan', () => {
    for (const count of [5, 7]) {
      const frame = timelineFrame(count, timelineTiming(count).draw)
      assert.equal(frame.active, count - 1)
      assert.equal(frame.pan, Math.max(0, count - VISIBLE_MILESTONES))
      const [x, y] = arrowTip(frame, count)
      near(x, 1185.83, 0.05, `tip x for ${count}`)
      near(y, 55.63, 0.05, `tip y for ${count}`)
    }
  })

  it('fades out and pans back during the reset', () => {
    for (let time = draw + hold; time < loop; time += 0.01) {
      const frame = timelineFrame(7, time)
      assert.equal(frame.active, -1)
      if ((time - draw - hold) / reset >= 0.4) assert.equal(frame.opacity, 0)
    }
    assert.ok(timelineFrame(7, loop - 1e-3).pan < 0.01)
  })

  it('wraps around after one loop', () => {
    assert.deepEqual(timelineFrame(7, loop), timelineFrame(7, 0))
    assert.deepEqual(timelineFrame(7, -1), timelineFrame(7, 0))
  })
})

describe('staticFrame and idleFrame', () => {
  it('rests the arrow at the design corner without panning', () => {
    for (const count of [5, 7]) {
      const frame = staticFrame(count)
      near(frame.head.x, 1175.655, 0.05, `head x for ${count}`)
      near(frame.head.y, 57.5, 0.05, `head y for ${count}`)
      assert.equal(frame.head.angle, 0)
      const [x, y] = arrowTip(frame, count)
      near(x, 1185.83, 0.05, `tip x for ${count}`)
      near(y, 55.63, 0.05, `tip y for ${count}`)
      assert.equal(frame.pan, 0)
      assert.equal(frame.active, -1)
      assert.equal(frame.arrow, true)
    }
  })

  it('waits at the base of the line without the arrow', () => {
    const frame = idleFrame(7)
    assert.equal(frame.headX, lineLayout(7).lineStart)
    assert.equal(frame.arrow, false)
    assert.equal(frame.pan, 0)
    assert.equal(frame.active, -1)
  })
})
