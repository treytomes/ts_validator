beforeAll(() => {
	console.info('This will be run before the test suite starts.');
});

afterAll(() => {
	console.info('This will be run after the test suite finished.');
});

describe('Test Suite #1', () => {
	beforeEach(() => {
		console.info('This will be run before each test case.');
	});

	afterEach(() => {
		console.info('This will be run after each test case.');
	});

	test('A thing.', () => {
		expect(0).toEqual(0);
		expect(0).toEqual(1);
	});

	test('Another thing.', () => {
		expect(0).toEqual(0);
		expect(0).toEqual(1);
	});
})