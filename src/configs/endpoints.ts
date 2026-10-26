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
    getDetail: (slug: string, lang: string) =>
      `api/v1/taxonomy-detail?taxonomy=sectors&slug=${slug}&lang=${lang}&acf=true`,
    getProjects: (locale: string, slug: string) =>
      `api/v1/get-all/projects?limit=3&lang=${locale}&tax=sectors&sectors=${slug}&acf=true`,
  },
  investorRelations: {
    vi: 'wp/v2/pages/465?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/467?_fields=acf&acf_format=standard',
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
      `api/v1/get-all/investor-relations?lang=${lang}&paged=${paged}&limit=${limit}&acf=true${
        category ? `&tax=cate-investor-relations&cate-investor-relations=${category}` : ''
      }`,
    getCategories: (locale: string) =>
      `api/v1/taxonomies/cate-investor-relations?lang=${locale}&nested=true&acf=true`,
  },
  projects: {
    vi: 'wp/v2/pages/498?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/500?_fields=acf&acf_format=standard',
    getSectors: (locale: string) => `api/v1/taxonomies/sectors?lang=${locale}&parent=0&acf=true`,
    getProjects: ({
      limit,
      paged,
      lang,
      category,
      order = 'DESC',
      search,
    }: {
      limit: number
      paged: number
      lang: string
      category?: string
      order?: string
      search?: string
    }) => {
      const params = new URLSearchParams({
        lang,
        limit: String(limit),
        paged: String(paged),
        orderby: 'date',
        order,
        acf: 'true',
      })

      if (category) {
        params.set('tax', 'sectors')
        params.set('sectors', category)
      }
      if (search?.trim()) params.set('search', search.trim())

      return `api/v1/get-all/projects?${params}`
    },
    getDetail: (slug: string, lang: string) =>
      `api/v1/get-detail/projects?slug=${slug}&lang=${lang}&acf=true`,
  },
  news: {
    vi: 'wp/v2/pages/516?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/518?_fields=acf&acf_format=standard',
    getCategories: (locale: string) =>
      `api/v1/taxonomies/category?lang=${locale}&nested=true&acf=true`,
    getPosts: ({
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
      `api/v1/get-all/post?lang=${lang}&limit=${limit}&paged=${paged}&acf=true${
        category ? `&tax=category&category=${category}` : ''
      }`,
    getDetail: (slug: string, lang: string) =>
      `api/v1/get-detail/post?slug=${slug}&lang=${lang}&acf=true`,
  },
  careers: {
    vi: 'wp/v2/pages/533?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/535?_fields=acf&acf_format=standard',
    getLocations: (locale: string) =>
      `api/v1/taxonomies/locations?lang=${locale}&nested=true&acf=true`,
    getDepartments: (locale: string) =>
      `api/v1/taxonomies/departments?lang=${locale}&nested=true&acf=true`,
    getCareers: ({
      limit,
      paged,
      lang,
      location,
      department,
      order = 'DESC',
      search,
    }: {
      limit: number
      paged: number
      lang: string
      location?: string
      department?: string
      order?: string
      search?: string
    }) => {
      const params = new URLSearchParams({
        lang,
        limit: String(limit),
        paged: String(paged),
        orderby: 'date',
        order,
        acf: 'true',
      })

      const taxes: string[] = []
      if (location) {
        taxes.push('locations')
        params.set('locations', location)
      }
      if (department) {
        taxes.push('departments')
        params.set('departments', department)
      }
      if (taxes.length > 0) params.set('tax', taxes.join(','))
      if (search?.trim()) params.set('search', search.trim())

      return `api/v1/get-all/careers?${params}`
    },
    getDetail: (slug: string, lang: string) =>
      `api/v1/get-detail/careers?slug=${slug}&lang=${lang}&acf=true`,
    form_id: '574',
    unit_tag: 'a0f8589',
  },
  contact: {
    vi: 'wp/v2/pages/587?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/589?_fields=acf&acf_format=standard',
  },
}

export default ENDPOINTS
