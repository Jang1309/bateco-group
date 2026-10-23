const ENDPOINTS = {
  siteSettings: {
    get: (locale: string) => `api/v1/site-settings?locale=${locale}`,
  },
  homepage: {
    vi: 'wp/v2/pages/90?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/88?_fields=acf&acf_format=standard',
    getPostList: (locale: string) => `api/v1/get-all/post?limit=8&lang=${locale}`,
    getSectors: (locale: string) => `api/v1/taxonomies/sectors?lang=${locale}&parent=0&acf=true`,
    getProjects: (locale: string) => `api/v1/get-all/projects?limit=8&lang=${locale}`,
  },
  introduction: {
    vi: 'wp/v2/pages/246?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/248?_fields=acf&acf_format=standard',
  },
  administrativeDocument: {
    vi: 'wp/v2/pages/344?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/346?_fields=acf&acf_format=standard',
    getDocuments: ({
      limit,
      paged,
      lang,
      category,
    }: {
      limit: number
      paged: number
      lang: string
      category?: string
    }) =>
      `api/v1/get-all/ad-document?lang=${lang}&paged=${paged}&limit=${limit}&acf=true${
        category ? `&tax=ad-document-cate&ad-document-cate=${category}` : ''
      }`,
    getCategories: (locale: string) =>
      `api/v1/taxonomies/ad-document-cate?lang=${locale}&parent=0&acf=true`,
  },
  businessField: {
    vi: 'wp/v2/pages/391?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/393?_fields=acf&acf_format=standard',
    getSectors: (locale: string) => `api/v1/taxonomies/sectors?lang=${locale}&parent=0&acf=true`,
  },
}

export default ENDPOINTS
