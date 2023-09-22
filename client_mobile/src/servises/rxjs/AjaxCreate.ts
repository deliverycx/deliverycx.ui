import { AjaxResponse, ajax } from 'rxjs/ajax';
import { IAjaxparams } from './AjaxApi';

class AjaxCreate {
	static _instanse: null | AjaxCreate = null;
	private URL: string = process.env.REACT_APP_API_URL as string;

	apiAjax<T>(params:any,url:string):ReturnType<typeof ajax>  {

		if(params.method === "post" ||
		params.method === "put" ||
		params.method === "delete" ||
		params.method === "patch"){
			return ajax({
				url: `${this.URL}/${url}`,
				method: params.method,
				body:params.data,
				headers: {
					'Content-Type': 'application/json',
					'rxjs-custom-header': 'Rxjs'
				},
				
			})
		}else{
			return ajax({
				url: `${this.URL}/${url}`,
				method: params.method,
				headers: {
					'Content-Type': 'application/json',
					'rxjs-custom-header': 'Rxjs'
				},
				
			})
		}
		
	}

	static getInstance() {
		return new AjaxCreate()
	}
}

export default AjaxCreate;