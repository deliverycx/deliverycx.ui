import {validate} from "class-validator";

export const validatorDTO = (ext:any,err?:()=> void) =>{
	validate(ext).then(errors => {
		
		if (errors.length > 0) {
			console.log('validation failed. errors: ', errors);
			//throw Error('wqeqwe')
			err && err()
		}
	});
}