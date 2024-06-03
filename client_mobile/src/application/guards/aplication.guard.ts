import { mappersDTO } from 'application/helpers/mappersDTO';
import { validatorDTO } from 'application/helpers/validatorDTO';

export interface IAccessGuard<T> {
  existing(data: T): boolean;
}
export function AccessGuard<R>(Guard: new () => IAccessGuard<any>) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      const classGuard = new Guard();

      classGuard.existing(args[0]);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export function DTOMapper(mapper: any) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      const originalResult = originalMethod.apply(this, args);
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
