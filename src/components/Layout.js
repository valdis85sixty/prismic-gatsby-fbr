import * as React from 'react'
import { Helmet } from 'react-helmet'

import { TopMenu } from './TopMenu'
import { Footer } from './Footer'

export const Layout = ({ children, topMenu, activeDocMeta }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Helmet>
      <TopMenu topMenu={topMenu} activeDocMeta={activeDocMeta} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
