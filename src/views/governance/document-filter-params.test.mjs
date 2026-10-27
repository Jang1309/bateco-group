import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  documentFilterParams,
  getDocumentFilter,
  setDocumentCategory,
  setDocumentCategoryOnly,
  setDocumentPage,
} from './document-filter-params.ts'

describe('documentFilterParams', () => {
  it('uses vietnamese keys for vi', () => {
    assert.deepEqual(Object.keys(documentFilterParams('vi')).sort(), ['danh-muc', 'trang'])
  })

  it('uses english keys for en', () => {
    assert.deepEqual(Object.keys(documentFilterParams('en')).sort(), ['category', 'page'])
  })
})

describe('getDocumentFilter', () => {
  it('reads en category/page', () => {
    assert.deepEqual(getDocumentFilter('en', { category: 'company-charter', page: 2 }), {
      categorySlug: 'company-charter',
      page: 2,
    })
  })

  it('reads vi danh-muc/trang', () => {
    assert.deepEqual(getDocumentFilter('vi', { 'danh-muc': 'dieu-le', trang: 3 }), {
      categorySlug: 'dieu-le',
      page: 3,
    })
  })
})

describe('setDocumentCategory / setDocumentPage', () => {
  it('writes en keys', () => {
    assert.deepEqual(setDocumentCategory('en', 'company-charter'), {
      category: 'company-charter',
      page: 1,
    })
    assert.deepEqual(setDocumentPage('en', 4), { page: 4 })
    assert.deepEqual(setDocumentCategoryOnly('en', 'company-charter'), {
      category: 'company-charter',
    })
  })

  it('writes vi keys', () => {
    assert.deepEqual(setDocumentCategory('vi', 'dieu-le'), {
      'danh-muc': 'dieu-le',
      trang: 1,
    })
    assert.deepEqual(setDocumentPage('vi', 1), { trang: 1 })
  })
})
