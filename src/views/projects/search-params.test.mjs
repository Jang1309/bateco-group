import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  getProjectsFilter,
  projectsSearchParams,
  setProjectsPage,
  setProjectsSector,
  setProjectsSort,
} from './search-params.ts'

describe('projectsSearchParams', () => {
  it('uses vietnamese keys for vi', () => {
    assert.deepEqual(Object.keys(projectsSearchParams('vi')).sort(), [
      'linh-vuc',
      'q',
      'sap-xep',
      'trang',
    ])
  })

  it('uses english keys for en', () => {
    assert.deepEqual(Object.keys(projectsSearchParams('en')).sort(), [
      'page',
      'q',
      'sector',
      'sort',
    ])
  })
})

describe('getProjectsFilter / setters', () => {
  it('maps en sort newest/oldest to canonical moi-nhat/cu-nhat', () => {
    assert.deepEqual(getProjectsFilter('en', { sector: 'real-estate', sort: 'oldest', page: 2 }), {
      sector: 'real-estate',
      q: null,
      sort: 'cu-nhat',
      page: 2,
    })
    assert.deepEqual(setProjectsSort('en', 'cu-nhat'), { sort: 'oldest', page: 1 })
    assert.deepEqual(setProjectsSector('en', 'defense'), { sector: 'defense', page: 1 })
    assert.deepEqual(setProjectsPage('en', 3), { page: 3 })
  })

  it('keeps vi linh-vuc/sap-xep/trang', () => {
    assert.deepEqual(
      getProjectsFilter('vi', { 'linh-vuc': 'bat-dong-san', 'sap-xep': 'moi-nhat', trang: 1 }),
      {
        sector: 'bat-dong-san',
        q: null,
        sort: 'moi-nhat',
        page: 1,
      },
    )
    assert.deepEqual(setProjectsSort('vi', 'moi-nhat'), { 'sap-xep': 'moi-nhat', trang: 1 })
  })
})
