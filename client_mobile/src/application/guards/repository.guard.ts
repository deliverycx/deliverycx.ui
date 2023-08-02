import { AjaxResponse } from "rxjs/ajax";
import { map } from 'rxjs';

export function guardPiPeRepository<T>(guard: (value: T) => T,) {
	return (source: any) =>
		source.pipe(
			map((value: AjaxResponse<T>) => {
				if (value.response) {
					return guard(value.response)
				} else {
					throw Error('ошибка в гварде')
				}

			})
		);
}

export function guardRepository<T>(guard: (value: T) => T,) {
	return (source: any) => {
		if (source) {
			return guard(source)
		} else {
			throw Error('ошибка в гварде')
		}
	}
		
}