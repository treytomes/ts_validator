import {createValidation, describe, validate, ValidationError} from './validators-core';

export function length(min: number, max: number): Function {
	return createValidation((target: any, propertyKey: string) => {
		const value = target[propertyKey];
		if (value.length < min) {
			return new ValidationError(`${describe(target, propertyKey)} cannot be shorter than ${min}.`);
		} else if (max < value.length) {
			return new ValidationError(`${describe(target, propertyKey)} cannot be longer than ${max}.`);
		} else {
			return null;
		}
	});
}

export function notEmpty(): Function {
	return createValidation((target: any, propertyKey: string) => {
		const value = target[propertyKey];
		if (!value) {
			return new ValidationError(`${describe(target, propertyKey)} must have a value.`);
		}
		return null;
	});
}

export function lessThanOrEqualTo(otherPropertyKey: string): Function {
	return createValidation((target: any, propertyKey: string) => {
		const value = target[propertyKey];
		const comparedTo = target[otherPropertyKey];
		if (value > comparedTo) {
			return new ValidationError(`${describe(target, propertyKey)} must be <= ${describe(target, otherPropertyKey)}.`);
		}
		return null;
	});
}

export function greaterThanOrEqualTo(otherPropertyKey: string): Function {
	return createValidation((target: any, propertyKey: string) => {
		const value = target[propertyKey];
		const comparedTo = target[otherPropertyKey];
		if (value < comparedTo) {
			return new ValidationError(`${describe(target, propertyKey)} must be >= ${describe(target, otherPropertyKey)}.`);
		}
		return null;
	});
}

export { validate, ValidationError }
