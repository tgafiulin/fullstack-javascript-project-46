gendiff: 
	node bin/gendiff.js

install: 
	npm i

lint:
	npx eslint .

test: 
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8