import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Outfit Picker" key="title"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="icon" type="svg" href="/fits.svg" />
        <meta property="og:description" content="Pick an outfit with the help of AI" key="description"/>
        <meta
          property="og:image"
          content=""
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
