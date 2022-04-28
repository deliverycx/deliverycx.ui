import Slider from "react-slick";
import NewsItem from "../News/NewsItem";

const SlideBarNews = () => {
	const settings = {
		className: 'slider-company-news',
		infinite: true,
		slidesToShow: 3,
		speed: 500,
		rows: 1,
	};

	let news = [
		{
			id: 1,
			imgUrl: "/images/news/banner-2.png"
		},
		{
			id: 2,
			imgUrl: "/images/news/banner-4.png"
		},
		{
			id: 3,
			imgUrl: "/images/news/banner-6.png"
		},
		{
			id: 4,
			imgUrl: "/images/news/banner-8.png"
		},
		{
			id: 5,
			imgUrl: "/images/news/banner-10.png"
		},
		{
			id: 6,
			imgUrl: "/images/news/banner-12.png"
		}
	];

	return (
		<div className="stocks about-comp_grind_news">
			<Slider {...settings}>
					{news.map((el) => {
						return <NewsItem key={el.id} imgUrl={el.imgUrl}/>;
					})
					}
			</Slider>
		</div>
	);
};

export default SlideBarNews;
