/* eslint-disable @next/next/no-img-element */
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
						<title>
							«Старик Хинкалыч» - крупнейшая сеть хинкальных в России
		        </title>
						<meta
		          name="description"
		          content="Выбирайте ближайший адрес и попробуйте хинкали от 45 рублей, румяные хачапури и другие блюда грузинской кухни!"
		          key="desc"
		        />
						<meta name="keywords" content="старик хинкалыч, хинкалыч сайт меню, хинкали доставка, заказать хинкали" />
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
						<meta name="yandex-verification" content="46bb2570dfd8760a" />
						<span className="metrika">424242</span>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
						
        </Head>
        <script async src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=473431c9-b8f6-45d6-a166-243a0152c68b"></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
