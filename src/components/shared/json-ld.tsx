type JsonLdProps = {
  data: unknown
}

/** Server-rendered JSON-LD for Google (prefer initial HTML over client inject). */
const JsonLd = ({ data }: JsonLdProps) => {
  if (data == null) return null

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export default JsonLd
