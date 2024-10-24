import * as yup from "yup";
// import debounce from 'lodash.debounce';
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import store from "../store";



// const findSiti = (GeoCode: {
//     Components:
//         Array<{
//             kind: string,
//             name: string
//         }>
// }): boolean | void => {
//         const getSiti = store.getState()
//         const kind = (element:any, index:number) => (element.kind === 'locality')
//     const GeoName = GeoCode.Components.find(kind)
//     console.log(GeoCode.Components)
//         return GeoName?.name === getSiti.address.city.name
// }

// async function checkAddress(value: string, resolve: (value: boolean)=>void){
//     try{
//         const address = encodeURI(value);
//         const {data} = await axios.get<IGeoCodeResponse>(
//             `https://geocode-maps.yandex.ru/1.x/?geocode=${address}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
//         )
//         const GeoCode = data.response
//         .GeoObjectCollection
//         .featureMember[0]
//         .GeoObject
//         .metaDataProperty
//         .GeocoderMetaData
//         .Address
        
 
//         if(+data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found === 0 ) throw Error();
        
//         resolve(true);
//     }catch(e){
//         resolve(false);
//     }
// }

// const debounceCheckAddress = debounce(checkAddress, 200);

export const valid ={
	name: yup
			.string()
			.required('Поле обязательно для заполнения'),
	address: yup
			.string()
			.required('Все поля обезательны для заполнения'),
	house: yup
			.string()
			.required('Все поля обезательны для заполнения'),		
	phone: yup
			.string()
			.trim()
			.matches(/^(\+7)(\s(\d){3}){2}(\s(\d){2}){2}/, {
					message: "Не верный формат телефона"
			})
			.required('Поле обязательно для заполнения'),
	email:yup.string().email()		
}

const schemaBuild = (type:string) => {
  switch (type) {
    case 'COURIER':
      return yup.object().shape({
        address:valid.address,
				//house:valid.house,
        name: valid.name,
        phone: valid.phone
      })
      break;
    case 'PICKUP':
      return yup.object().shape({
        name: valid.name,
        phone: valid.phone
      })
      break;
		case 'ONSPOT':
      return yup.object().shape({
        name: valid.name,
        phone: valid.phone
      })
      break;	
    default:
      return yup.object().shape({
        //address:valid.address,
        name: valid.name,
        phone: valid.phone
      })
      break;
  }

}

export const shemaReserve = () => yup.object().shape({
  fullname: valid.name,
  phone: valid.phone,
  date: yup
      .string()
    .required('Поле обязательно для заполнения'),
  time: yup
    .string()
      .nullable()
    .min(5, 'Неверный формат времени')
    .required('Поле обязательно для заполнения'),
  person: yup
    .string()
    .required('Поле обязательно для заполнения'),
})

export const shemaAdress = () => yup.object().shape({
  address:valid.address,
	house:valid.house,
})

export const shemaProfilePersonal = () => yup.object().shape({
  name: valid.name,
	lastname:yup.string(),
	male:yup
		.string()
		.required('Поле обязательно для заполнения'),
  phone: valid.phone,
	email:valid.email
})


export default schemaBuild;