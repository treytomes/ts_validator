import "reflect-metadata";
const validatorsMetadataKey = Symbol("validators");

export class ValidationError extends Error {
	constructor(msg: string) {
		super(msg);
	}
}

export function createValidation(validator: Function): Function {
	return (target: any, propertyKey: string) => {
		const classConstructor = target.constructor;
		const validators: Function[] = Reflect.getOwnMetadata(validatorsMetadataKey, classConstructor, propertyKey) ?? [];
		validators.push(validator);
		Reflect.defineMetadata(validatorsMetadataKey, validators, classConstructor, propertyKey);
	}
}

export function describe(target: any, propertyKey: string) {
	return `${propertyKey} (${JSON.stringify(target[propertyKey])})`;
}

export function validate(target: any): ValidationError[] {
	return Object.getOwnPropertyNames(target)
		.flatMap(p => Reflect.getOwnMetadata(validatorsMetadataKey, target.constructor, p)
			?.map((v: Function) => v(target, p))
			.filter((e: ValidationError[]) => e)
		).filter(x => x);
}
