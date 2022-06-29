import NewsItems from "../News/NewsItem";
import cn from "classnames";

const SlideBarNews = ({isVisible}:{isVisible: boolean}) => {
	const CN = cn("stocks about-comp_grind_news", { isVisible: isVisible})

	return (
		<div className={CN}>
			<NewsItems />
		</div>
	);
};

export default SlideBarNews;
