import { validate } from 'class-validator';

const mappersDTO = <T, R>(p: T[] | T, fn: (val: T) => R) => {
	if (Array.isArray(p)) {
		return p.map((val: T) => {
			return fn(val);
		});
	} else {
		return fn(p);
	}
};

const validatorDTO = (ext: any, err?: () => void) => {
	validate(ext).then((errors) => {
		if (errors.length > 0) {
			console.log('validation failed. errors: ', errors);
			//throw Error('wqeqwe')
			err && err();
		}
	});
};

export function DTOMapper(mapper: any) {
	return function (
		target: any,
		propertyName: string,
		descriptor: PropertyDescriptor,
	) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any) {
			const originalResult = await originalMethod.apply(this, args);

			if (originalResult) {
				const dto = mappersDTO(originalResult, (val) => mapper(val));

				validatorDTO(dto);

				return dto;
			}
			return originalMethod.apply(this, args);
		};

		return descriptor;
	};
}
