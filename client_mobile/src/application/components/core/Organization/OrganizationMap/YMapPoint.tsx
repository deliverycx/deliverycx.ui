/* eslint-disable @typescript-eslint/no-var-requires */
import { initialStatePointsMap } from 'application/reducers/PointsReducer';
import { FC, useContext } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
} from 'react-yandex-maps';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { useState } from 'react';
import { useEffect } from 'react';
import placemark from 'assets/images/icons/placemark.svg';
import { isDesctomMediaQuery } from 'application/ResponseMedia';

export const mokPoint = [
  {
    contacts: {
      phone: '+7971111111',
      email: 'Onix1234x@gmail.com',
    },
    _id: '5f850000-90a3-0025-1f21-08d98a63d2af',
    city: {
      _id: '6169326c7759b79df383276c',
      name: 'Симферополь',
    },
    latitude: 44.965425,
    longitude: 39.012211,
    products: '6172ca3e130b3fdd43002979',
    street: 'Турецкая 1111',
    workTime: '22',
  },
  {
    contacts: {
      phone: '+797822222',
      email: 'Onix1234x@gmail.com',
    },
    _id: '5f850000-90a3-0025-1f21-08d98a63d2af',
    city: {
      _id: '6169326c7759b79df383276c',
      name: 'Симферополь',
    },
    latitude: 41.955435,
    longitude: 34.053521,
    products: '6172ca3e130b3fdd43002979',
    street: 'Турецкая 2222',
    workTime: '22',
  },
  {
    contacts: {
      phone: '+797833333',
      email: 'Onix1234x@gmail.com',
    },
    _id: '5f850000-90a3-0025-1f21-08d98a63d2af',
    city: {
      _id: '6169326c7759b79df383276c',
      name: 'Симферополь',
    },
    latitude: 45.935645,
    longitude: 31.065831,
    products: '6172ca3e130b3fdd43002979',
    street: 'Турецкая 3333',
    workTime: '22',
  },
  {
    contacts: {
      phone: '+797824444',
      email: 'Onix1234x@gmail.com',
    },
    _id: '5f850000-90a3-0025-1f21-08d98a63d2af',
    city: {
      _id: '6169326c7759b79df383276c',
      name: 'Симферополь',
    },
    latitude: 47.975775,
    longitude: 32.096241,
    products: '6172ca3e130b3fdd43002979',
    street: 'Турецкая 444',
    workTime: '22',
  },
];

const placeMarkOption = {
  iconLayout: 'default#image',
  iconImageHref: placemark,
  iconImageSize: [44, 60],
  iconImageOffset: [-20, -35],
};

type IProps = {
  statePoint: typeof initialStatePointsMap;
  addresses: IOrganization[];
  placemarkClick: (addresses: IOrganization, index: number) => void;
};

const YMapPoint: FC<IProps> = ({ statePoint, addresses, placemarkClick }) => {
  const [cord, setCord] = useState([0.0, 0.0]);

  const desc = isDesctomMediaQuery();

  useEffect(() => {
    if (addresses && addresses.length) {
      if (addresses[statePoint.slideIndex]) {
        setCord([
          addresses[statePoint.slideIndex].info.cords[1],
          addresses[statePoint.slideIndex].info.cords[0],
        ]);
      } else {
        const randomindex = Math.floor(Math.random() * addresses.length);
        setCord([
          addresses[randomindex].info.cords[1],
          addresses[randomindex].info.cords[0],
        ]);
      }
    }
  }, [statePoint.slideIndex, addresses]);

  return (
    <>
      <YMaps>
        <div>
          <Map
            width="100"
            height={desc ? '760px' : '100vh'}
            defaultState={{
              center: cord,
              zoom: 13,
            }}
            state={{
              center: cord,
              zoom: 13,
            }}
          >
            <ZoomControl
              options={{
                position: { right: 10, bottom: desc ? 400 : 300 },
                zoomSize: 'small',
              }}
            />
            <GeolocationControl
              options={{ position: { right: 10, bottom: desc ? 350 : 250 } }}
            />
            {addresses.map((address: IOrganization, index: number) => {
              if (address.info) {
                return (
                  <Placemark
                    onClick={() => placemarkClick(address, index)}
                    key={index}
                    options={placeMarkOption}
                    geometry={[address.info.cords[1], address.info.cords[0]]}
                  />
                );
              }
            })}
          </Map>
        </div>
      </YMaps>
    </>
  );
};
export default YMapPoint;
