'use strict';
const TextLintTester = require('textlint-tester');
const tester = new TextLintTester();
const rule = require('../src/index');

tester.run(
	'spelling basics',
	{
		rules: [
			{
				ruleId: 'spelling',
				rule,
				options: {
					language: 'en',
					skipPatterns: ['npm'],
				},
			},
		],
	},
	{
		valid: [
			'text',
			'npm is amazing',
			'these test texts are wonderful!',
			'"this should be" spelled correctly',
			'Sometimes (things like this) can catch us out()',
			'Braces {} are {hard}',
			'Square [brackets] are also hard[]',
			'hasn\'t this passed the test?',
			'spelling is hard, we must meet our user\'s needs',
			'spelling is hard; we must meet our user\'s needs',
			'spelling is hard, we must meet our user\'s needs and/or requirements',
			`spelling is hard, we must meet our user's needs
and/or requirements`,
			'sometimes single \'quotes\' are used too',
		],
		invalid: [
			{
				text: 'It is colour.',
				output: 'It is color.',
				errors: [
					{
						message: 'colour -> color',
						line: 1,
						column: 7,
					},
				],
			},
			{
				text: `It has many colour.

One more colour`,
				output: `It has many color.

One more color`,
				errors: [
					{
						message: 'colour -> color',
						line: 1,
						column: 13,
					},
					{
						message: 'colour -> color',
						line: 3,
						column: 10,
					},
				],
			},
		],
	}
);
