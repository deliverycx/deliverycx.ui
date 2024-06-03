import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import OrganizationCardItem from './OrganizationCardItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import { FC, useEffect, useRef, useState } from 'react';
import { IOrganizationStatus } from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type';

const OrganizationSwipe: FC<{
  organizations: IOrganization[];
  point: IOrganization;
}> = ({ organizations, point }) => {
  const [sw, setSw] = useState<any>();

  useEffect(() => {
    if (point) {
      const findindex = organizations.findIndex(
        (val) => val.guid === point.guid,
      );
      sw && sw.slideToLoop(findindex, 200);
    }
  }, [point, sw]);

  return (
    <>
      <Swiper
        spaceBetween={0}
        loop={true}
        slidesPerView={1.1}
        centeredSlides={true}
        className="organization_slide"
        onSwiper={(swiper) => setSw(swiper)} //sw.current = swiper
        onRealIndexChange={(swiper) => {
          //useCaseOrganization.selectOrganization(organizations[swiper.realIndex])
          //appUseCase.crealPoint()
        }}
      >
        {organizations.map((organization: any, index) => {
          return (
            <SwiperSlide key={organization.guid}>
              {({ isActive, isVisible }) => (
                <OrganizationCardItem
                  active={isActive}
                  viseble={isVisible}
                  organization={organization}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default OrganizationSwipe;
