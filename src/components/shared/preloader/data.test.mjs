import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { PRELOADER_DIVIDERS, PRELOADER_PANELS } from './data.ts'

describe('preloader data', () => {
  it('covers five diagonal panels with seam dividers on the joins', () => {
    assert.equal(PRELOADER_PANELS.length, 5)
    assert.equal(PRELOADER_DIVIDERS.length, 4)

    const first = PRELOADER_PANELS[0].clipPath
    const last = PRELOADER_PANELS[4].clipPath
    assert.match(first, /^polygon\(0% 0%/)
    assert.match(last, /100% 100%, 76\.953125% 100%\)$/)

    // Each divider sits on the panel join (top ≈ panel right edge)
    const topSeams = ['25.78125%', '44.921875%', '64.0625%', '83.203125%']
    const bottomSeams = ['19.53125%', '38.671875%', '57.8125%', '76.953125%']
    for (const [index, seam] of topSeams.entries()) {
      assert.equal(PRELOADER_DIVIDERS[index].x1, seam)
      assert.equal(PRELOADER_DIVIDERS[index].x2, bottomSeams[index])
    }
  })

  it('mobile bands join on the divider seams', () => {
    for (const [index, divider] of PRELOADER_DIVIDERS.entries()) {
      const seam = `100% ${divider.y2}, 0% ${divider.y1})`
      assert.ok(PRELOADER_PANELS[index].mobile.clipPath.endsWith(seam))
      assert.ok(
        PRELOADER_PANELS[index + 1].mobile.clipPath.startsWith(
          `polygon(0% ${divider.y1}, 100% ${divider.y2}`,
        ),
      )
    }
  })
})
