DOCS = docs/*.md
REPORTER ?=spec

test:
		@NODE_ENV=test ./node_modules/.bin/mocha  \
					--reporter $(REPORTER)

test-cov: lib-cov
		@ELASTICSEARCHCLIENT_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
		@rm -rf ./lib-cov

lib-cov:
		@jscoverage lib $@

lint:
	./node_modules/.bin/jshint ./lib --config .jshintrc && \
	./node_modules/.bin/jshint ./test --config ./test/.jshintrc

.PHONY: test test-cov
