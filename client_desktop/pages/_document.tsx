import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
        </Head>
        <script async src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=164ee8b6-9e22-4e21-84ed-a0778bdf0f37"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
