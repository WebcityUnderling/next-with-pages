import {NextIntlProvider} from 'next-intl';
import Head from 'next/head';
import '@/styles/globals.css'

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>App Development Company</title>
        <meta name="robots" content="index, follow"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:title" content="App development company" />
        <meta property="og:site_name" content="App Development Company"></meta>
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </>
  )
}