js: ./demo/index.js ./test/index.js

./demo/index.js: ./demo/index.jsx
	./node_modules/.bin/browserify ./demo/index.jsx -t babelify > ./demo/index.js

./test/index.js: ./test/index.jsx
	./node_modules/.bin/browserify ./test/index.jsx -t babelify > ./test/index.js

.PHONY: js
