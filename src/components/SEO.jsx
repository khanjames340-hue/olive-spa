import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description = 'Premium spa treatments, massage therapy, skincare and beauty services in Juba, South Sudan.',
  path = '',
}) {
  const fullTitle = title
    ? `${title} | Olive Spa Juba`
    : 'Olive Spa Juba | Luxury Beauty and Wellness Spa'
  const url = `https://olivespa.ss${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Olive Spa" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
