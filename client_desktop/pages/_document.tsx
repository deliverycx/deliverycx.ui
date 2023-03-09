import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
        </Head>
        <script async src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=e45f9cf9-d514-40a5-adb9-02524aaef83f"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
