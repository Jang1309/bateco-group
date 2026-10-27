import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  careersSearchParams,
  getCareersFilter,
  setCareersDepartment,
  setCareersLocation,
  setCareersPage,
} from './search-params.ts'

describe('careersSearchParams', () => {
  it('uses vietnamese keys for vi', () => {
    assert.deepEqual(Object.keys(careersSearchParams('vi')).sort(), [
      'dia-diem',
      'phong-ban',
      'q',
      'trang',
    ])
  })

  it('uses english keys for en', () => {
    assert.deepEqual(Object.keys(careersSearchParams('en')).sort(), [
      'department',
      'location',
      'page',
      'q',
    ])
  })
})

describe('getCareersFilter / setters', () => {
  it('reads and writes en department/location/page', () => {
    assert.deepEqual(getCareersFilter('en', { department: 'hr', location: 'hanoi', page: 2 }), {
      department: 'hr',
      location: 'hanoi',
      q: null,
      page: 2,
    })
    assert.deepEqual(setCareersDepartment('en', 'hr'), { department: 'hr', page: 1 })
    assert.deepEqual(setCareersLocation('en', null), { location: null, page: 1 })
    assert.deepEqual(setCareersPage('en', 4), { page: 4 })
  })

  it('reads and writes vi phong-ban/dia-diem/trang', () => {
    assert.deepEqual(
      getCareersFilter('vi', { 'phong-ban': 'nhan-su', 'dia-diem': 'ha-noi', trang: 1 }),
      { department: 'nhan-su', location: 'ha-noi', q: null, page: 1 },
    )
    assert.deepEqual(setCareersDepartment('vi', 'nhan-su'), {
      'phong-ban': 'nhan-su',
      trang: 1,
    })
  })
})
