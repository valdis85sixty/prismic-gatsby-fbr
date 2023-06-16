import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export const SEO = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="url" content={seo.url} />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${seo.title}",
            "datePublished": "2015-02-05T08:00:00+08:00",
            "dateModified": "2015-02-05T09:20:00+08:00",
            "author": [
              {
                "@type": "Person",
                "name": "Jane Doe",
                "url": "https://example.com/profile/janedoe123"
              }
            ]
          }
        `}
      </script>
      {children}
    </Helmet>
  )
}
