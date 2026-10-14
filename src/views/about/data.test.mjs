import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { ABOUT_CONTENT } from './data.ts'

describe('ABOUT_CONTENT leadership team', () => {
  const team = ABOUT_CONTENT.leadership.team

  it('lists the eleven leaders in the agreed order', () => {
    assert.deepEqual(
      team.map((leader) => leader.name),
      [
        'Mr. Giang Thanh Nghĩa',
        'Mr. Vũ Minh Toản',
        'Mr. Lê Anh Tuấn',
        'Mr. Đàm Kiên',
        'Mr. Trần Anh Kiên',
        'Mrs. Hoàng Thị Thu Hường',
        'Mr. Nguyễn Văn Nhật',
        'Mrs. Hoàng Thị Thu',
        'Mr. Nguyễn Thành Nam',
        'Mr. Nguyễn Đức Linh',
        'Mr. Nguyễn Hữu Thành',
      ],
    )
  })

  it('keeps every role of leaders holding several positions', () => {
    const roles = Object.fromEntries(team.map((leader) => [leader.name, leader.roles]))
    assert.deepEqual(roles['Mr. Giang Thanh Nghĩa'], ['Phó chủ tịch HĐQT', 'Phó TGĐ Bateco VN'])
    assert.deepEqual(roles['Mr. Vũ Minh Toản'], [
      'Phó TGĐ Bateco VN',
      'Giám đốc Bateco Quốc An',
      'Giám đốc Bateco Distributor',
    ])
    assert.deepEqual(roles['Mr. Nguyễn Văn Nhật'], [
      'Trưởng phòng Phát triển nhân sự - Truyền thông',
    ])
  })

  it('gives every leader at least one role and an image', () => {
    for (const leader of team) {
      assert.ok(leader.roles.length > 0, leader.name)
      assert.ok(leader.image.startsWith('/gioi-thieu/'), leader.name)
    }
  })
})

describe('ABOUT_CONTENT history', () => {
  const milestones = ABOUT_CONTENT.history.milestones

  it('lists the seven milestones in chronological order', () => {
    assert.deepEqual(
      milestones.map((milestone) => milestone.year),
      ['2012', '2017', '2020', '2023', '2026', '2028', '2032'],
    )
  })

  it('fills every field of every milestone', () => {
    for (const milestone of milestones) {
      for (const field of ['year', 'tag', 'title', 'description']) {
        assert.ok(milestone[field].trim().length > 0, `${milestone.year} ${field}`)
      }
    }
  })
})

describe('ABOUT_CONTENT pillars', () => {
  it('uses a dedicated image for each pillar', () => {
    assert.deepEqual(
      ABOUT_CONTENT.pillars.map((pillar) => pillar.image.src),
      [
        '/gioi-thieu/pillars/tam-nhin.jpg',
        '/gioi-thieu/pillars/su-menh.jpg',
        '/gioi-thieu/pillars/gia-tri.jpg',
      ],
    )
  })
})
