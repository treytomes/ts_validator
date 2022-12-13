import { ValidationError, notEmpty, length, lessThanOrEqualTo, greaterThanOrEqualTo, validate } from './validators';

function report(errors: ValidationError[]) {
	if (!errors) {
		return;
	}
	console.error('Validation errors:');
	for (let n = 0; n < errors.length; n++) {
		console.error(`* ${errors[n].message}`);
	}
}

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

const task1 = new Task('I need to do this thing.', new Date('2022-12-11'), new Date('2022-12-15'));
console.info(task1);
report(validate(task1));
console.log();

const task2 = new Task('', new Date('2022-12-11'), new Date('2022-11-15'));
console.info(task2);
report(validate(task2));
console.log();
