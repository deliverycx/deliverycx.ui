import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
        </Head>
        <script async src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fa9674dc-9524-4159-a9ae-88861c637505"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
