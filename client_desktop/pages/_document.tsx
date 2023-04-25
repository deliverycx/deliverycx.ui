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
		          content="Выбирайте ближайший адрес и попробуйте хинкали от 35 рублей, румяные хачапури и другие блюда грузинской кухни!"
		          key="desc"
		        />
						<meta name="keywords" content="старик хинкалыч, хинкалыч сайт меню, хинкали доставка, заказать хинкали" />
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
						<meta name="yandex-verification" content="46bb2570dfd8760a" />
						<span className="metrika">424242</span>
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
