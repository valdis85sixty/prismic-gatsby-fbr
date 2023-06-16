import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/Seo'
import { components } from '../slices'

const PageTemplate = ({ data }) => {
  if (!data) return null

  const pageContent = data.prismicPage
  const page = pageContent.data || {}

  const { lang, type, url } = pageContent
  const alternateLanguages = pageContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const topMenu = data.prismicTopMenu || {}
  const seo = {
    title: page.display_title.text,
    pathname: url,
    description: page.seo_description
  }

  return (
    <Layout topMenu={topMenu.data} activeDocMeta={activeDoc}>
      <SEO {...seo} />
      <SliceZone slices={page.body} components={components} />
    </Layout>
  )
}

export const query = graphql`
  query pageQuery($id: String, $lang: String) {
    prismicPage(id: { eq: $id }, lang: { eq: $lang }) {
      _previewable
      url
      uid
      type
      id
      lang
      alternate_languages {
        id
        type
        lang
        uid
      }
      data {
        display_title {
          text
        }
        seo_description
        body {
          ... on PrismicSliceType {
            id
            slice_label
            slice_type
          }
          ...PageDataBodyEmailSignup
          ...PageDataBodyFullWidthImage
          ...PageDataBodyHeadlineWithButton
          ...PageDataBodyInfoWithImage
          ...PageDataBodyTextInfo
        }
      }
    }
    prismicTopMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
    }
  }
`

export default withPrismicPreview(PageTemplate)
