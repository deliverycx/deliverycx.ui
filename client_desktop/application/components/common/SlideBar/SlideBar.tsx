import cn from "classnames";
import { useState } from 'react';
import SlideBarInfo from "./SlideBarInfo";
import SlideBarNews from "./SlideBarNews";

const SlideBar = () => {
  const [swtch,setSwtch] = useState(false)
  const CN1 = cn("link_news", { active: !swtch })
  const CN2 = cn("link_news", { active: swtch})

  return (
    <div className="about_main">
      <section className="about_comp-switch">
        <div className={CN1} onClick={() => setSwtch(false)}>
          Компания <a>«Cтарик Хинкалыч»</a>
        </div>
        <div className={CN2} onClick={() => setSwtch(true)}>Новости</div>
      </section>
      <section className="slidebars">
        <SlideBarNews isVisible={swtch} />
        <SlideBarInfo isVisible={!swtch} />
      </section>
    </div>
  );
}
export default SlideBar
