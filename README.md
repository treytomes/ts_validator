# TypeScript Validator

Validate TypeScript objects.

## Example

1. Define some validators.

```ts
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
```

2. Add the decorators to some properties on the class you want to validate.
```ts
class Task {
	@notEmpty()
	@length(5, 15)
	description: string;

	@lessThanOrEqualTo('endDate')
	startDate: Date;

	@greaterThanOrEqualTo('startDate')
	endDate: Date;
	
	completed: boolean;

	constructor(description: string, startDate: Date, endDate: Date) {
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.completed = false;
	}
}
```

3. Create an instance of the class and use the ```validate``` function to check for errors.
```ts
const t = new Task('I need to do this thing.', new Date('2022-12-11'), new Date('2022-12-15'));
console.info(t);
const errors = validate(t);
onsole.error('Validation errors:');
for (let n = 0; n < errors.length; n++) {
  console.error(`* ${errors[n].message}`);
}
```
