const ENDPOINTS = {
  siteSettings: {
    get: (locale: string) => `api/v1/site-settings?locale=${locale}`,
  },
  homepage: {
    vi: 'wp/v2/pages/90?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/88?_fields=acf&acf_format=standard',
    getPostList: (locale: string) => `api/v1/get-all/post?limit=8&lang=${locale}`,
    getSectors: (locale: string) => `api/v1/taxonomies/sectors?lang=${locale}&parent=0&acf=true`,
  },
}

export default ENDPOINTS
