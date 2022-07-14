/* eslint-disable react/jsx-no-target-blank */
import cn from "classnames";

const SlideBarInfo = ({isVisible}:{isVisible: boolean}) => {
  const CN = cn("about-comp_grind", { isVisible: isVisible})

    return (
        <div className={CN}>
          <div className="about-comp_grind-item">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform"
               target="_blank">
              <img className="about-comp_grind-item--img" src="/images/company-news/vakans.png" />
            </a>
          </div>
          <div className="about-comp_grind-item">
            <a href="https://франшиза.хинкалыч.рф/" target="_blank">
              <img className="about-comp_grind-item--img" src="/images/company-news/franhiz.png" />
            </a>
          </div>
          <div className="about-comp_grind-item">
            <a href="https://t.me/Starik_Khinkalych" target="_blank">
              <img className="about-comp_grind-item--img" src="/images/company-news/out.png" />
            </a>
          </div>
        </div>
    );
};
export default SlideBarInfo;
