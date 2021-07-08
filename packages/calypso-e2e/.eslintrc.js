module.exports = {
	env: {
		node: true,
	},
	rules: {
		// This is a node.js project, it is ok to import node modules
		'import/no-nodejs-modules': 'off',
		'no-console': 'off',
		'wpcalypso/import-docblock': 'off',
		'require-jsdoc': [
			'error',
			{
				require: {
					FunctionDeclaration: true,
					MethodDefinition: true,
					ClassDeclaration: true,
					ArrowFunctionExpression: false,
					FunctionExpression: false,
				},
			},
		],
	},
};
