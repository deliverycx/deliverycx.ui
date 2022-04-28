import Slider from "react-slick";
import NewsItem from "../News/NewsItem";

const SlideBarNews = () => {
	const settings = {
		className: 'slider-news',
		infinite: false,
		slidesToShow: 3,
		speed: 500,
		rows: 1,
	};

	let news = [
		{
			id: 1,
			title: "Новость 1"
		},
		{
			id: 2,
			title: "Новость 2"
		},
		{
			id: 3,
			title: "Новость 3"
		},
		{
			id: 4,
			title: "Новость 4"
		}
	];

	return (
		<div className="stocks about-comp_grind_news">
			<Slider {...settings}>
					{news.map((el,idx) => {
						return <NewsItem key={el.id} title={el.title} idx={idx}/>;
					})
					}
			</Slider>
		</div>
	);
};

export default SlideBarNews;
